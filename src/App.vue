<template>
  <nav>
    <ul>
      <div class="image">
        <h6>
          <router-link :to="{ name: 'Home' }">
            <img src="@/assets/elements/normal.png" width="150" alt="" />
          </router-link>
        </h6>
      </div>
      <div class="Text">
        <a href="#">Kreasi Face Attendance</a>
        <ul class="nav navbar-nav navbar-right">
          <router-link :to="{ name: 'Events' }">
          <button type="button1" class="btn btn-link">Daftar Events</button>
          </router-link>

          <router-link :to="{ name: 'Register' }">
          <button type="button2" class="btn btn-primary">Register Wajah</button>
          </router-link>
        </ul>
      </div>
    </ul>
  </nav>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <router-view></router-view>
</template>


<script>
// import HelloWorld from "./components/HelloWorld.vue";

// export default {
//   name: "App",
//   components: {
//     HelloWorld,
//   },
// };
</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
@import "./assets/css/Style.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
