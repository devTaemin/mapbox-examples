<template>
    <div>
        <div class="mapHeader">Display Raster</div>

        <div class="mapContent">
            <div id="mapContainer" class="basemap"></div>
        </div>
        
    </div>
</template>


<script>
import { mapboxToken } from '../assets/mapboxToken'
import Mapbox from 'mapbox-gl'


export default ({
    name: 'DisplayRaster',
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
            zoom: 9,
            maxBounds: [
                [126.604, 36.8156],        
                [127.104, 37.8156],
            ],
        });  

        this.map.on('load', () => {
                this.map.addSource('radar', {
                    'type': 'image',
                    'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
                    'coordinates': [
                        [126.804, 37.1156],
                        [126.994, 37.1156],
                        [126.994, 37.7156],
                        [126.804, 37.7156],
                    ]
                });
                this.map.addLayer({
                    id: 'rader-layer',
                    'type':'raster',
                    'source':'radar',
                    'paint': {
                        'raster-fade-duration': 0
                    }
                });
            });
    },
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