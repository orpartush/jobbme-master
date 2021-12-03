<template>
  <div class="searchfield flex align-center space-between">
    <input
      type="text"
      class="search-input"
      placeholder="Search positions"
      v-model="searchValue"
      v-debounce:300ms="handleSearchInput"
    />
    <img src="@/assets/images/search.png" alt="Search" class="search-icon" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const searchValue = ref('')

    function handleSearchInput() {
      try {
        const currentFilterBy = store.state.position.filterBy
        const updatedFilterBy = {
          ...currentFilterBy,
          search: searchValue.value
        }
        store.commit({ type: 'position/setFilterBy', updatedFilterBy })
      } catch (err) {
        console.error(`Error while handling search input`, err)
      }
    }

    return { searchValue, handleSearchInput }
  }
}
</script>

<style lang="scss" scoped>
@import './searchfield';
</style>
