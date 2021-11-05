<template>
    <div>
        <div class="mapHeader">Display Building</div>

        <div class="mapContent">
            <div id="mapContainer" class="basemap"></div>
        </div>
        
    </div>
</template>


<script>
import { mapboxToken } from '../assets/mapboxToken'
import Mapbox from 'mapbox-gl'


export default ({
    name: 'DisplayBuilding',
    components: {
    },
    data() {
        return {
            accessToken: mapboxToken,
            counter: 0,
            map: 0,
        }
    },
    methods: {

    },
    mounted() {
        Mapbox.accessToken = this.accessToken;

        this.map = new Mapbox.Map({
            container: 'mapContainer',
            style: "mapbox://styles/mapbox/streets-v11",
            center: [126.804, 37.3156],
            zoom: 16,
            pitch: 55,
            antialias: true,
        });  

        this.map.addControl(new Mapbox.FullscreenControl());

        this.map.on('load', () => {
            const bins = 16;
            const maxHeight = 200;
            const binWidth = maxHeight / bins;
        
            // Divide the buildings into 16 bins based on their true height, using a layer filter.
            for (let i = 0; i < bins; i++) {
                this.map.addLayer({
                    'id': `3d-buildings-${i}`,
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': [
                        'all',
                        ['==', 'extrude', 'true'],
                        ['>', 'height', i * binWidth],
                        ['<=', 'height', (i + 1) * binWidth]
                    ],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': '#aaa',
                        'fill-extrusion-height-transition': {
                            duration: 0,
                            delay: 0
                        },
                        'fill-extrusion-opacity': 0.6
                    }
                });
            }

            if (navigator.mediaDevices === undefined) {
                navigator.mediaDevices = {};
            }

            if (navigator.mediaDevices.getUserMedia === undefined) {
                navigator.mediaDevices.getUserMedia = (constraints) => {
                // First get ahold of the legacy getUserMedia, if present
                const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                
                // Some browsers just don't implement it - return a rejected promise with an error
                // to keep a consistent interface
                if (!getUserMedia) {
                    return Promise.reject(
                    new Error(
                        'getUserMedia is not implemented in this browser'
                        )
                    );
                }
                
                // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                };
            }
            navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
            // Set up a Web Audio AudioContext and AnalyzerNode, configured to return the
            // same number of bins of audio frequency data.
            const audioCtx = new (window.AudioContext ||
            window.webkitAudioContext)();
            
            const analyser = audioCtx.createAnalyser();
            analyser.minDecibels = -90;
            analyser.maxDecibels = -10;
            analyser.smoothingTimeConstant = 0.85;
            
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
            
            analyser.fftSize = bins * 2;
            
            const dataArray = new Uint8Array(bins);
            
            function draw(now) {
            analyser.getByteFrequencyData(dataArray);
            
            // Use that data to drive updates to the fill-extrusion-height property.
            let avg = 0;
            for (let i = 0; i < bins; i++) {
            avg += dataArray[i];
            this.map.setPaintProperty(
            `3d-buildings-${i}`,
            'fill-extrusion-height',
            10 + 4 * i + dataArray[i]
            );
            }
            avg /= bins;
            
            // Animate the map bearing and light color over time, and make the light more
            // intense when the audio is louder.
            this.map.setBearing(now / 500);
            const hue = (now / 100) % 360;
            const saturation = Math.min(50 + avg / 4, 100);
            this.map.setLight({
            color: `hsl(${hue},${saturation}%,50%)`,
            intensity: Math.min(1, (avg / 256) * 10)
            });
            
            requestAnimationFrame(draw);
            }
            
            requestAnimationFrame(draw);
            })
            .catch((err) => {
            console.log('The following gUM error occurred:', err);
            });

        });
    } 
})
</script>


<style scoped>
#markerButton {
    margin-bottom: 15px;
}

#marker {
    width: 8vw;
    height: 3vh;
    font-size: 1em;
    border: none;
    border-radius: 10%;
    background-color: rgba(94, 156, 181, 0.2);
    font-weight: 600;
}

#marker:hover {
    transition: 0.5s ease-in-out background-color;
    background-color: rgb(94, 156, 181);
}
</style>