<template>
<div class='intro'>
  <div class='intro-inner'>
    <h1>Daily<br/>Report</h1>
    <!-- 이 부분은 동적으로 변경되어야함 -->
    <!--<router-link class='button' to='/day/2018-01-01'>-->
    <!-- Data Binding 을 해주는거지!! -->
    <router-link class='button' :to='todayUrl'>
      Start
    </router-link>
  </div>
</div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Intro',
  computed: {
    todayUrl () {
      return '/day/' + moment(new Date()).format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>

</style>
