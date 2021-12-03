<template>
  <div v-if="position" class="position-modal">
    <header class="flex align-center space-between">
      <p class="date">{{ positionDate }}</p>
      <section class="close-btn-container flex">
        <router-link to="/edit-position">
          <img src="@/assets/images/edit.png" alt="edit" class="edit-icon" title="Edit Position" />
        </router-link>
        <img
          src="@/assets/images/delete.png"
          alt="delete"
          class="delete-icon"
          title="Delete Position"
          @click="handleDeleteClick"
        />
        <img
          src="@/assets/images/close.svg"
          alt="Close"
          class="close-icon"
          @click="closeEvent"
          title="Close Position"
        />
      </section>
    </header>
    <main class="modal-content">
      <h1 class="title">{{ position.title }}</h1>
      <section class="company-wrapper flex space-between">
        <p class="company"><span>Company:</span> {{ position.company }}</p>
        <p class="location"><span>Location:</span> {{ position.location }}</p>
      </section>
      <section class="number-link-wrapper flex space-between">
        <p class="number"><span>Number:</span> {{ positionNumber }}</p>
        <a :href="position.url" class="url flex justify-center" target="_blank">
          Link
          <img src="@/assets/images/new-tab.svg" alt="Link" />
        </a>
      </section>
      <section class="description-container">
        <label for="description">Descripiton:</label>
        <p class="description">{{ position.description }}</p>
      </section>
      <section class="stage-wrapper flex space-between">
        <p class="stage"><span>Stage: </span>{{ position.stage }}</p>
        <p class="did-answer"><span>Recieved answer: </span>{{ position.didAnswer }}</p>
      </section>
      <section class="answer-container">
        <label for="answer">Answer:</label>
        <p class="answer">{{ position.answer }}</p>
      </section>
    </main>
    <footer></footer>
  </div>
  <div v-else class="loading">Loading position...</div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { utilService } from '../../../services/util.service'
import Swal from 'sweetalert2'

export default {
  props: {
    positionId: String,
    clickedPosition: Object,
    getUpdatedList: Function
  },
  setup(props, context) {
    const store = useStore()
    const router = useRouter()

    const position = ref({})
    const positionDate = ref('')
    const positionNumber = ref('')

    onMounted(async () => {
      try {
        if (props.positionId) {
          position.value = store.state.position.clickedPosition
          positionDate.value = utilService.getCreatedDate(position.value.date)
          positionNumber.value = position.value.number ? position.value.number : 'None'
        }
      } catch (err) {
        console.error(`Error while getting modal's position`, err)
      }
    })

    function closeEvent() {
      store.commit('position/closePositionModal')
    }

    async function handleDeleteClick() {
      try {
        //delete in mongo
        await store.dispatch({
          type: 'position/deletePosition',
          positionData: { positionId: props.positionId, userId: store.state.user.loggedInUser._id }
        })
        props.getUpdatedList()

        Swal.fire({
          title: 'Deleted position successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        })

        store.commit({ type: 'position/closePositionModal' })
        router.push('/')
      } catch (err) {
        console.error(`Error while handling delete click`, err)
      }
    }

    return {
      closeEvent,
      position,
      positionDate,
      handleDeleteClick,
      positionNumber
    }
  }
}
</script>

<style lang="scss" scoped>
@import './position-modal';
</style>
