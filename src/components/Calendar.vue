<template>
    <div class='calendar'>
      <full-calendar
        :config="config"
        @day-click='dayclick'
      ></full-calendar>
    </div>
</template>

<script>
import {FullCalendar} from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
import {mapGetters} from 'vuex'
export default {
  name: 'Calendar',
  components: {
    FullCalendar
  },
  data () {
    return {
      config: {
        defaultView: 'month',
        header: {
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        height: 500,
        lang: 'ko'
      }
    }
  },
  methods: {
    dayclick (date) {
      let url = `/day/${date.format('YYYY-MM-DD')}`
      this.$router.push(url)
    },
    applySettings () {
      this.config['locale'] = this.savedSettings.lang
    }
  },
  computed: {
    ...mapGetters(['savedSettings'])
  },
  created () {
    this.applySettings()
  }
}
</script>

<style scoped>

</style>
