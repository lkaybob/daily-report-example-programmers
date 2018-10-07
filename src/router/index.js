import Vue from 'vue'
import Router from 'vue-router'

import Intro from '@/components/Intro'
import Day from '@/components/Day'
import Setting from '@/components/Setting'
import Calendar from '@/components/Calendar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro,
      meta: {transitionName: 'slide'}
    },
    {
      path: '/day/:date',
      name: 'day',
      component: Day,
      meta: {transitionName: 'slide'}
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
      meta: {transitionName: 'slide'}
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: {transitionName: 'slide'}
    }
  ]
})
