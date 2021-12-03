<template>
  <div class="modal-mask" @click="onMaskClick"></div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'ModalMask',
  setup() {
    const store = useStore()

    function onMaskClick() {
      store.commit({ type: 'position/closePositionModal' })
    }

    return {
      onMaskClick,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './modal-mask';
</style>
