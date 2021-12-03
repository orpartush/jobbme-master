<template>
  <form v-if="positionValues" class="position-form flex flex-column" @submit.prevent="handleSubmit">
    <div class="inputs-wrapper flex space-between">
      <input
        type="text"
        name="title"
        class="title"
        placeholder="Position title"
        v-model="formData.title"
        required
      />
      <input
        type="text"
        name="company"
        class="company"
        placeholder="Company name"
        v-model="formData.company"
      />
    </div>

    <div class="inputs-wrapper flex space-between">
      <input type="number" class="position-number" placeholder="Position number" v-model="formData.number" />
      <input
        type="location"
        name="location"
        class="location"
        placeholder="Location"
        v-model="formData.location"
      />
    </div>

    <input type="text" name="url" class="url" placeholder="Link" v-model="formData.url" />

    <textarea
      class="description"
      cols="60"
      rows="10"
      placeholder="Position description"
      v-model="formData.description"
    ></textarea>

    <div class="inputs-wrapper flex">
      <section class="answer-dropdown flex align-center">
        <label for="did-answered">Did answer?</label>
        <select name="did-answered" id="did-answered" v-model="formData.didAnswer">
          <option>No</option>
          <option>Yes</option>
        </select>
      </section>
      <input
        type="text"
        name="answer"
        class="answer"
        placeholder="Company answer"
        v-model="formData.answer"
        :style="answerStyle"
      />
    </div>

    <input type="text" name="stage" class="stage" placeholder="Current stage" v-model="formData.stage" />

    <button class="submit-btn" type="submit">{{ btnText }}</button>
  </form>
</template>

<script>
import { onMounted, ref, computed } from 'vue'

export default {
  name: 'PositionForm',
  props: {
    positionValues: Object,
    onSubmit: Function,
    isEditForm: Boolean,
    btnText: String
  },
  setup(props) {
    const formData = ref({
      title: '',
      company: '',
      stage: '',
      url: '',
      description: '',
      didAnswer: 'No',
      answer: '',
      location: '',
      number: ''
    })

    onMounted(() => {
      try {
        if (props.positionValues) {
          const currentFormValues = { ...props.positionValues }
          const didAnswer = currentFormValues.didAnswer ? 'Yes' : 'No'
          formData.value = { ...currentFormValues, didAnswer }
        }
      } catch (err) {
        console.error(`Error while handling positionValues`, err)
      }
    })

    async function handleSubmit() {
      try {
        await props.onSubmit(formData.value)
      } catch (err) {
        console.error(`Error while handling position submit`)
      }
    }

    const answerStyle = computed(() => {
      return {
        display: formData.value.didAnswer === 'Yes' ? 'block' : 'none'
      }
    })

    return {
      answerStyle,
      formData,
      handleSubmit,
      btnText: props.btnText
    }
  }
}
</script>

<style lang="scss" scoped>
@import './position-form';
</style>
