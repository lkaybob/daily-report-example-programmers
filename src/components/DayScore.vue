<template>
  <div class='score'>
    <button
      v-for='button in buttons'
      :key='button.label'
      @click='updateScore(button.score)'
      :class='{active:item.score===button.score}'
    >{{ button.label}}</button>
  </div>
</template>

<script>
export default {
  name: 'DayScore',
  props: [
    'item'
  ],
  methods: {
    updateScore (score) {
      console.log(this.item)

      this.$emit('onUpdateScore', this.item, score)
    }
  },
  data () {
    return {
      buttons: [
        {label: 'GOOD', score: 3},
        {label: 'SOSO', score: 2},
        {label: 'BAD', score: 1}
      ]
    }
  }
}
</script>

<style scoped>

</style>
