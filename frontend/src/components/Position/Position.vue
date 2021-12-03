<template>
  <div class="position flex flex-column">
    <header class="position-header flex space-between">
      <div class="title-wrapper grow-2">
        <span class="title">{{ position.title }}</span>
      </div>
      <p class="date grow-1">{{ fixedDate }}</p>
    </header>
    <section class="mid-content">
      <p class="company">Company: {{ position.company }}</p>
      <p class="location">Location: {{ position.location }}</p>
      <p v-if="position.number" class="number">Number: {{ position.number }}</p>
    </section>
    <section class="bottom-container flex align-center space-between">
      <div class="did-answer-wrapper flex align-center">
        <p class="text">
          Status: {{ position.didAnswer ? 'Answered' : 'Pending' }}
          <span class="circle" :style="didAnswerStyle"></span>
        </p>
        <div class="circle" :style="didAnswerStyle"></div>
      </div>
      <a :href="position.url" class="link flex align-center">
        <img class="link-img" src="@/assets/images/url-icon.png" alt="Link" />
        <p class="text">Link</p>
      </a>
    </section>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { utilService } from '../../services/util.service'

export default {
  name: 'Position',
  props: {
    position: Object
  },
  setup({ position }) {
    const fixedDate = utilService.getCreatedDate(position.date)

    const didAnswerStyle = ref({})

    onMounted(() => {
      didAnswerStyle.value = {
        backgroundColor: position.didAnswer ? '#5cbd0d' : 'crimson'
      }
    })

    return {
      fixedDate,
      didAnswerStyle
    }
  }
}
</script>

<style lang="scss" scoped>
@import './position';
</style>
