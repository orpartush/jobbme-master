<template>
  <div class="add-position">
    <PositionForm
      :onSubmit="onSubmit"
      :positionValues="initialFormValues"
      :isEditForm="false"
      :btnText="'Add Position'"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import PositionForm from '../../components/PositionForm/PositionForm.vue'
import Swal from 'sweetalert2'

export default {
  components: { PositionForm },
  setup() {
    const store = useStore()
    const router = useRouter()

    const initialFormValues = {
      title: '',
      company: '',
      stage: '',
      url: '',
      description: '',
      didAnswer: 'No',
      answer: '',
      location: '',
      number: ''
    }

    async function onSubmit(formData) {
      try {
        const userId = store.state.user.loggedInUser._id
        const boolDidAnswer = formData.didAnswer === 'Yes'
        const fixedUrl = formData.url.includes('https://') ? formData.url : `https://${formData.url}`
        const position = { ...formData, didAnswer: boolDidAnswer, date: new Date(), url: fixedUrl, userId }
        const user = await store.dispatch({ type: 'position/addPosition', position })
        store.commit({ type: 'user/setLoggedInUser', user })

        Swal.fire({
          title: 'Added position successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        })

        router.push('/positions')
      } catch (err) {
        console.error('Error while trying to submit position', err)
      }
    }

    return {
      onSubmit,
      initialFormValues
    }
  }
}
</script>

<style lang="scss" scoped>
@import './add-position';
</style>
