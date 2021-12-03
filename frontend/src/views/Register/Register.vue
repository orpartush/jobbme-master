<template>
  <form class="register flex flex-column align-center" @submit.prevent="handleSubmit">
    <h2 class="title">Register</h2>
    <input
      type="email"
      class="email-input"
      name="email"
      placeholder="Email"
      required
      v-model="formData.email"
    />
    <input class="name-input" name="name" placeholder="Name" v-model="formData.name" />
    <input
      type="password"
      class="password-input"
      name="password"
      placeholder="Password"
      required
      v-model="formData.password"
    />
    <input
      type="password"
      class="confirm-input"
      name="confirm"
      placeholder="Confirm"
      required
      v-model="formData.confirm"
    />
    <button type="submit">Join to Jobbme</button>
    <p v-if="isError" class="submit-error">{{ errorMsg }}</p>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const formData = ref({
      email: '',
      name: '',
      password: '',
      confirm: ''
    })
    const errorMsg = ref('')
    const isError = ref(false)

    async function handleSubmit() {
      const { email, name, password, confirm } = formData.value

      if (password !== confirm) {
        displayErrorMsg('Passowrd and Confirm are not matching', 3000)
        return
      }

      const userToRegister = { email, name, password }
      const user = await store.dispatch({ type: 'user/register', formData: userToRegister })
      if (!user) {
        displayErrorMsg(`Unable to register at the moment, try later`, 3000)
      } else router.push('/positions')
    }

    function displayErrorMsg(msg, ms) {
      errorMsg.value = msg
      isError.value = true
      setTimeout(() => (isError.value = false), ms)
    }

    return {
      formData,
      isError,
      errorMsg,
      handleSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
@import './register';
</style>
