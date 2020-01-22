<template>
  <div class="home">
    <NavBarTools />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBarTools: NavBar
  }
};
</script>

<style lang="scss"></style>
