<template>
  <div class="sort flex align-center justify-center">
    <button
      class="date-btn"
      title="Order by data"
      :class="activeSortType === 'date' ? 'active-btn' : ''"
      @click="handleSortClick('date')"
    >
      Date
    </button>
    <button
      class="answered-btn"
      title="Order by answered"
      :class="activeSortType === 'answered' ? 'active-btn' : ''"
      @click="handleSortClick('answered')"
    >
      Answered
    </button>
    <button
      class="not-answered-btn"
      title="Order by not answered"
      :class="activeSortType === 'not-answered' ? 'active-btn' : ''"
      @click="handleSortClick('not-answered')"
    >
      Not Answered
    </button>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const filterBy = ref(computed(() => store.state.position.filterBy))
    const activeSortType = ref('')

    function handleSortClick(clickedBtn) {
      try {
        activeSortType.value = clickedBtn
        const updatedFilterBy = { ...filterBy.value, sort: clickedBtn }
        store.commit({ type: 'position/setFilterBy', updatedFilterBy })
      } catch (err) {
        console.error(`Error while handling sort click`, err)
      }
    }

    return {
      handleSortClick,
      activeSortType
    }
  }
}
</script>

<style lang="scss" scoped>
@import './sort';
</style>
