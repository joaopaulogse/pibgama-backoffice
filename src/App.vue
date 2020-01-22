<template>
  <div id="app">
    <router-view />
    <b-loading :is-full-page="true" :active.sync="isLoading">
      <b-icon icon="loading" size="is-large" custom-class="fa-spin"> </b-icon>
    </b-loading>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("loader", { isLoading: "getLoading" })
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
body {
  height: 100%;
}
html {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
