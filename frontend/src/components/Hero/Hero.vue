<template>
  <div class="hero flex align-center justify-center">
    <h1 class="title">
      {{ currentTitle }}
    </h1>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const route = useRoute()
    const currentRoute = ref(computed(() => route.path))
    const currentTitle = ref(computed(() => getCurrentTitleValue()))

    function getCurrentTitleValue() {
      const routeValue = currentRoute.value
      return routeValue === '/positions'
        ? 'Positions'
        : routeValue === '/new-position'
        ? 'New Position'
        : routeValue === '/edit-position'
        ? 'Edit Position'
        : routeValue === '/register'
        ? 'Welcome to Jobbme'
        : routeValue === '/login'
        ? 'Welcome to Jobbme'
        : 'Error'
    }

    return {
      currentTitle
    }
  }
}
</script>

<style lang="scss" scoped>
@import './hero';
</style>
