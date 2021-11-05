<template>
  <div id="app">
    <MainComponent></MainComponent>
  
    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>


<script>
import MainComponent from './components/MainComponent.vue';


export default {
  name: 'App',
  components: {
    MainComponent,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.mapHeader {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 600;
}

.mapContent {
    display: flex;
    justify-content: center;
}

.basemap {
    width: 70vw;
    height: 50vh;
    border: 3px solid rgba(0, 0, 0, 0.2);
    display: flex;
    box-sizing: border-box;
    
}

</style>
