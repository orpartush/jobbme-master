<template>
  <div class="position-list">
    <div class="search-wrapper flex justify-center align-center">
      <Searchfield />
      <Sort />
    </div>
    <div
      v-if="!positions || positions.length === 0"
      class="no-positions flex flex-column align-center justify-center"
    >
      <p>Cannot find positions</p>
    </div>
    <main v-else class="list-content">
      <section class="positions-wrapper grid">
        <Position
          :position="position"
          v-for="(position, idx) in positions"
          :key="idx + position._id"
          @click="onPositionClick(position._id)"
        />
      </section>
      <PositionModal
        v-if="shouldShowModal"
        @closeModalEvent="closeModalEvent"
        :positionId="clickedPositionId"
        :getUpdatedList="getUpdatedList"
      />
    </main>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { positionService } from '@/services/position.service.js'
import Position from '../Position/Position.vue'
import PositionModal from '../Modals/PositionModal/PositionModal.vue'
import ModalMask from '../Modals/ModalMask/ModalMask.vue'
import Searchfield from '../Searchfield/Searchfield.vue'
import Sort from '../Sort/Sort.vue'

export default {
  components: { Position, PositionModal, ModalMask, Searchfield, Sort },
  setup() {
    const store = useStore()

    const clickedPositionId = ref('')
    const filterBy = ref(computed(() => store.state.position.filterBy))
    const positions = ref(computed(() => getPositionsToDisplay()))
    const shouldShowModal = computed(() => store.getters['position/getIsPositionModalOn'])

    function getPositionsToDisplay() {
      try {
        let positionsToDisplay = []
        const allPositions = [...store.getters['user/getUserPositions']]

        if (filterBy.value?.search || filterBy.value?.sort) {
          positionsToDisplay = positionService.getFilteredPositions(filterBy.value, allPositions)
        } else positionsToDisplay = allPositions

        return positionsToDisplay
      } catch (err) {
        console.error(`Error while getting positions`, err)
        return []
      }
    }

    function onPositionClick(positionId) {
      const clickedPosition = positions.value.find(item => item._id === positionId)
      store.commit({ type: 'position/setClickedPosition', position: clickedPosition })
      clickedPositionId.value = positionId
      store.commit({ type: 'position/displayPositionModal' })
    }

    function closeModalEvent() {
      store.commit({ type: 'position/closePositionModal' })
    }

    // called when deleting position only
    async function getUpdatedList() {
      try {
        const updatedPositions = store.state.user.loggedInUser.positions.filter(position => {
          return position._id !== clickedPositionId.value
        })
        store.commit({ type: 'user/setUpdatedPositions', updatedPositions })
      } catch (err) {
        console.error(`Error while getting positions list`, err)
      }
    }

    return {
      positions,
      shouldShowModal,
      onPositionClick,
      closeModalEvent,
      clickedPositionId,
      getUpdatedList
    }
  }
}
</script>

<style lang="scss" scoped>
@import './position-list';
</style>
