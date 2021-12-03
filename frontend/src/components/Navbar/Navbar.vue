<template>
  <div class="navbar flex flex-column align-center">
    <section class="logo-container flex justify-center align-center">
      <router-link to="/">
        <p @click="onLinkClick">Jobbme</p>
      </router-link>
    </section>
    <section class="links-container">
      <div v-if="user" class="positions-link">
        <router-link to="/"><p @click="onLinkClick">Positions</p></router-link>
      </div>
      <div v-if="user" class="add-position-link">
        <router-link to="/new-position"><p @click="onLinkClick">New Position</p></router-link>
      </div>
      <div v-if="!user" class="register-link">
        <router-link to="/register"><p @click="onLinkClick">Register</p></router-link>
      </div>
      <div v-if="!user" class="login-link">
        <router-link to="/login"><p @click="onLinkClick">Login</p></router-link>
      </div>
      <div v-if="user" class="logout-link">
        <router-link to="/login"><p @click="onLogoutClick">Logout</p></router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'

export default {
  setup() {
    const store = useStore()

    const user = ref(computed(() => store.getters['user/getLoggedInUser']))

    function onLinkClick() {
      store.commit({ type: 'position/closePositionModal' })
    }

    async function onLogoutClick() {
      try {
        await store.dispatch({ type: 'user/logout' })
        onLinkClick()
        Swal.fire({
          title: 'Logged out successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      } catch (err) {
        console.error(`Error while handling logout click`, err)
      }
    }

    return {
      onLinkClick,
      onLogoutClick,
      user
    }
  }
}
</script>

<style lang="scss" scoped>
@import './navbar';
</style>
