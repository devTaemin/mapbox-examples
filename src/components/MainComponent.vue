<template>
    <div>
        <img alt="Vue logo" src="../assets/logo.png">

        <header id="app-header">
          <a href="/">Vue 2 & Mapbox Examples</a>
        </header>

        <div class="example-list">
        <ul>
            <li><a class="example-item" href="/displaymap">1. Display a map on a webpage</a></li>
            <li><a class="example-item" href="/displaymarker">2. Add a default marker to a web map</a></li>
            <li><a class="example-item" href="/displayraster">3. Add a raster image to a map layer</a></li>
            <li><a class="example-item" href="/displaybuilding">4. Animate 3D buildings based on ambient sounds</a></li>
        </ul>
        </div>  
    </div>
</template>
<script>
export default ({
    name: 'MainComponent',
})
</script>


<style scoped>
#app-header {
  font-size: 30px;
  font-weight: 600;
}

#app-header a {
  text-decoration-line: none;
}

.example-list {
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 30px;
  margin: 30px 100px;
  display: flex;
  justify-content: center;
}

.example-list ul {
  list-style: none;
  text-align: left;
}

.example-item {
  text-decoration-line: none;
}
</style>