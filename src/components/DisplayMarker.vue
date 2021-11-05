<template>
    <div>
        <div class="mapHeader">Display Marker</div>
        
        <div id="markerButton">
            <button id="marker" v-on:click="markerClick">Click</button>
        </div>

        <div class="mapContent">
            <div id="mapContainer" class="basemap"></div>
        </div>
        
    </div>
</template>


<script>
import { mapboxToken } from '../assets/mapboxToken'
import Mapbox from 'mapbox-gl'


export default ({
    name: 'DisplayMarker',
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
        markerClick: function(){
            new Mapbox.Marker().setLngLat([126.804, 37.3156]).addTo(this.map);
        }
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