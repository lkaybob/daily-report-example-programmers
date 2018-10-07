<template>
<div class='setting'>
  <h1>설정</h1>
  <form @submit.prevent='saveLocalSettings'>
    <fieldset>
      <label for='startTime'>시작시간</label>
      <select id='startTime' v-model='settings.startTime'>
        <option value='08:00'>08:00</option>
        <option value='09:00'>09:00</option>
        <option value='10:00'>10:00</option>
      </select>
    </fieldset>
    <fieldset>
      <label for='lang'>달력 언어</label>
      <select id='lang' v-model='settings.lang'>
        <option value='ko'>한국어</option>
        <option value='en'>영어</option>
      </select>
    </fieldset>
    <fieldset>
      <button type='submit' class='save'>
        저장
      </button>
    </fieldset>
  </form>
</div>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Setting',
  data () {
    return {
      settings: {
        startTime: '08:00',
        lang: 'ko'
      }
    }
  },
  methods: {
    ...mapActions(['saveSettings']),
    saveLocalSettings () {
      let url = `https://daily-report-example.firebaseio.com/items/settings.json`
      axios.put(url, this.settings).then((res) => {
        this.saveSettings(this.settings)
        alert('저장이 성공되었습니다.')
      })
    },
    getSettings () {
      // Settings 로 바로 들어가면 바로 뜨지 않음...ㅠㅠ
      this.settings = this.savedSettings
      // let url = `https://daily-report-example.firebaseio.com/items/settings.json`
      // axios.get(url).then((res) => {
      //   this.settings = res.data
      // })
    }
  },
  created () {
    this.getSettings()
  },
  computed: {
    ...mapGetters(['savedSettings'])
  }

}
</script>

<style scoped>

</style>
