<template>
  <form class="login flex flex-column align-center" @submit.prevent="handleSubmit">
    <h2 class="title">Login</h2>
    <input
      type="email"
      class="email-input"
      name="email"
      placeholder="Email"
      required
      v-model="formData.email"
    />
    <input
      type="password"
      class="password-input"
      name="password"
      placeholder="Password"
      required
      v-model="formData.password"
    />
    <button type="submit">Login</button>
    <p v-if="isError" class="submit-error">{{ errorMsg }}</p>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const errorMsg = ref('')
    const isError = ref(false)
    const formData = ref({
      email: '',
      password: ''
    })

    async function handleSubmit() {
      const user = await store.dispatch({ type: 'user/login', formData: formData.value })
      // if (user) router.push('/positions')
      if (!user) {
        displayErrorMsg(`Incorrect email or password`, 3000)
      } else {
        Swal.fire({
          title: 'Logged in successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        router.push('/positions')
      }
    }

    function displayErrorMsg(msg, ms) {
      errorMsg.value = msg
      isError.value = true
      setTimeout(() => (isError.value = false), ms)
    }

    return {
      formData,
      handleSubmit,
      isError,
      errorMsg
    }
  }
}
</script>

<style lang="scss" scoped>
@import './login';
</style>
