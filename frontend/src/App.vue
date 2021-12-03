<template>
  <vue-particles
    color="#FC335D"
    :particleOpacity="0.7"
    :particlesNumber="30"
    shapeType="circle"
    :particleSize="4"
    linesColor="#FC335D"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="2"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="true"
    clickMode="push"
  ></vue-particles>
  <router-view />
</template>

<script>
export default {
  setup() {}
}
</script>

<style lang="scss" scoped>
#particles-js {
  background-size: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
