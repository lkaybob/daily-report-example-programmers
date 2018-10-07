<template>
  <div class='day'>
    <!-- Router 설정에 날짜를 Param 으로 넘기니까 가능한 것! -->
    <h1 class='day-title'>{{$route.params.date}}</h1>
    <ul class='day-list'>
      <li
        v-for='item in items'
        :key='item.id'
        class='day-list-item'
        :class='{open: item.open}'
      >
        <div class='time'>
          <h2>{{ item.id}}</h2>
        </div>
        <div class='action'>
          <p
            v-if='!item.open'
          >
            {{ item.action}}
            <span v-if='item.action.length === 0'>내용을 작성해주세요</span>
          </p>
          <input type='text' v-if='item.open' v-model='item.action' placeholder='한 일을 작성해주세요'>
        </div>
        <day-score
          @onUpdateScore='onUpdateScore'
          :item='item'
        >
        </day-score>
        <div v-if='item.open' class='note'>
          <textarea v-model='item.note' @keyup.enter='updateItems(item)' placeholder='한 일을 작성해주세요'></textarea>
        </div>
        <div class='buttons' v-if='item.open'>
          <button class='save' @click='updateItems(item)'>저장</button>
          <button class='cancel' @click='toggleOpen(item)'>취소</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import DayScore from '@/components/DayScore'
import axios from 'axios'
import moment from 'moment'
import {mapGetters} from 'vuex'

export default {
  name: 'Day',
  components: {
    DayScore
  },
  methods: {
    onUpdateScore (item, score) {
      item.score = score
      console.log('Day Score' + score)
    },
    getItems () {
      let url = `https://daily-report-example.firebaseio.com/items.json?orderBy="$key"&startAt="${this.$route.params.date}"
      &endAt="${this.$route.params.date}-22-24"`
      console.log('get items')
      axios.get(url).then((res) => {
        console.log(res.data)
        this.items = this.displayItems(res.data)
      })
    },
    displayItems (results) {
      let items = []
      let startTime = this.savedSettings.startTime

      for (let i = 0; i < 12; i++) {
        let dateTime = moment(this.$route.params.date + ' ' + startTime)
        let itemKey = `${this.$route.params.date}-${dateTime.add(i * 2, 'hours').format('HH')}-${dateTime.add(2, 'hours').format('HH')}`
        let item = {
          id: itemKey,
          action: '',
          note: '',
          open: false,
          score: undefined
        }
        Object.keys(results).map((key) => {
          if (key === itemKey) {
            item = results[key]
          }
        })
        items.push(item)
      }
      return items
    },
    updateItems (item) {
      let url = `https://daily-report-example.firebaseio.com/items/${item.id}.json`
      axios.put(url, item).then((res) => {
        this.getItems()
      })
    },
    toggleOpen (item) {
      item.open = !item.open
    }
  },
  data () {
    return {
      items: []
    }
  },
  created () {
    this.getItems()
  },
  // 같은 컴포넌트 안에서 Route가 변경될때?!
  watch: {
    '$route' (to, from) {
      this.getItems()
    }
  },
  computed: {
    ...mapGetters(['savedSettings'])
  }
}
</script>

<style scoped>

</style>
