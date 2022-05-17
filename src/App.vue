<template>
  <header>
    <HeaderVue />
  </header>
  <main>
    <PlanetVue />
  </main>
</template>

<script>
import HeaderVue from "@/components/layout/Header.vue";
import PlanetVue from "@/components/layout/Planet.vue";

export default {
  components: {
    HeaderVue,
    PlanetVue,
  },
};
</script>
<style lang="scss">
#app {
  background: $bg-primary url('./assets/images/background-stars.svg');
  min-height: 100vh;
  height: 100%;
  position: relative;
  font-family: $spartan;
  padding-bottom: 48px;
}
</style>
