//router.js
import Vue from 'vue';
import VueRouter from 'vue-router';

//Components
import DisplayMap from './components/DisplayMap.vue'
import DisplayBuilding from './components/DisplayBuilding.vue'
import DisplayMarker from './components/DisplayMarker.vue'
import DisplayRaster from './components/DisplayRaster.vue'

//register VueRouter
Vue.use(VueRouter);

//Export
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
        },
        {
            path: '/displaymap',
            name: 'displaymap',
            component: DisplayMap,
        },
        {
            path: '/displaybuilding',
            name: 'displaybuilding',
            component: DisplayBuilding,
        },
        {
            path: '/displaymarker',
            name: 'displaymarker',
            component: DisplayMarker,
        },
        {
            path: '/displayraster',
            name: 'displayraster',
            component: DisplayRaster,
        },
    ]
})