<template>
  <div class="edit-position">
    <img
      src="@/assets/images/right-arrow.png"
      alt="Back"
      title="Go Back"
      class="back-btn"
      @click="onBackClick"
    />
    <PositionForm
      :positionValues="position"
      :onSubmit="onSubmit"
      :isEditForm="true"
      :btnText="'Edit Position'"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import PositionForm from '../../components/PositionForm/PositionForm.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    PositionForm
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const position = ref({ ...store.state.position.clickedPosition })
    const loggedInUser = ref(computed(() => store.getters['user/getLoggedInUser']))

    async function onSubmit(updatedPosition) {
      try {
        const userId = loggedInUser.value._id
        const didAnswer = updatedPosition.didAnswer === 'Yes' ? true : false
        const fixedUrl = updatedPosition.url.includes('https://')
          ? updatedPosition.url
          : `https://${updatedPosition.url}`

        const user = await store.dispatch({
          type: 'position/updatePosition',
          position: { ...updatedPosition, url: fixedUrl, userId, didAnswer }
        })

        store.commit({ type: 'user/setLoggedInUser', user })

        store.commit({ type: 'position/closePositionModal' })

        Swal.fire({
          title: 'Updated position successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        })

        router.push('/positions')
      } catch (e) {
        console.error('Error while submitting edited position', e)
      }
    }

    function onBackClick() {
      store.commit({ type: 'position/closePositionModal' })
      router.push('/')
    }

    return {
      position,
      onSubmit,
      onBackClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import './edit-position';
</style>
