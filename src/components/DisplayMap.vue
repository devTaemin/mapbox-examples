<template>
    <div>
        <div class="mapHeader">Display Map</div>
        
        <div class="mapContent">
            <div id="mapContainer" class="basemap"></div>
        </div>
        
    </div>
</template>


<script>
import { mapboxToken } from '../assets/mapboxToken'
import Mapbox from 'mapbox-gl'

export default ({
    name: 'DisplayMap',
    components: {
    },
    data() {
        return {
            accessToken: mapboxToken,
            
        }
    },

    mounted() {
        Mapbox.accessToken = this.accessToken;

        new Mapbox.Map({
            container: 'mapContainer',
            style: "mapbox://styles/mapbox/streets-v11",
            center: [126.804, 37.3156], // [126.804, 37.3156]
            zoom: 9,
            maxBounds: [
                [126.604, 36.8156],         // []
                [127.104, 37.8156],
            ],
        });
    }
})
</script>


<style scoped>


</style>