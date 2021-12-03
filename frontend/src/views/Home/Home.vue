<template>
  <div class="home flex content-container">
    <Navbar />
    <main class="content-layout">
      <Hero />
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Hero from '../../components/Hero/Hero.vue'
import Navbar from '../../components/Navbar/Navbar.vue'
import ModalMask from '../../components/Modals/ModalMask/ModalMask.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  components: { Navbar, Hero, ModalMask },
  setup() {
    const store = useStore()
    const router = useRouter()

    checkSessionForUser()

    const currentTitle = ref('')
    const shouldDisplayHomeConent = ref(false)

    /**gets a user if exist in session */
    async function checkSessionForUser() {
      try {
        const id = sessionStorage.getItem('userId')
        if (id) {
          const user = await store.dispatch({ type: 'user/getUserById', id })
          if (user) router.push('/positions')
        }
      } catch (err) {
        console.error(`Error while checking session for user`, err)
      }
    }

    return {
      currentTitle,
      shouldDisplayHomeConent
    }
  }
}
</script>

<style lang="scss" scoped>
@import './home';
</style>
