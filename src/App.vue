<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'

const DEFAULT_TRANSITION = 'fade'

export default {
  name: 'App',
  components: {Nav},
  data () {
    return {
      prevHeight: 0,
      transitionName: DEFAULT_TRANSITION
    }
  },
  methods: {
    ...mapActions(['saveSettings']),
    init () {
      if (typeof this.savedSettings.startTime === 'undefined') {
        this.getSettings()
      }
    },
    getSettings () {
      let url = `https://daily-report-example.firebaseio.com/items/settings.json`
      axios.get(url).then((res) => {
        this.saveSettings(res.data)
      })
    },
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter (element) {
      const { height } = getComputedStyle(element)

      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
    }
  },
  created () {
    this.init()
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }

      this.transitionName = transitionName || DEFAULT_TRANSITION
      next()
    })
  },
  computed: {
    ...mapGetters(['savedSettings'])
  }
}
</script>

<style lang="scss" src="./assets/css/style.scss">
</style>
