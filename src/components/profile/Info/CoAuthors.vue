<template>
  <div>
      <p>Основні співавтори</p>
    <ol>
      <li v-for="item in data">
        <router-link :to="'/profile/'+item.user_id">{{item.last_name}} </router-link> - {{item.count}}
      </li>
    </ol>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: []
    }
  },
  watch: {
    '$route.params.id': {
      handler(item) {
        this.get();
      }
    }
  },
  methods: {
    get() {
      axios.get('https://libarticle.polidar.in.ua/api/v1/report/co-author-top/profile/' + this.$route.params.id).then(response => {
        this.data = response.data;
      }, err => {
        console.log('error info -', err.message);
        // ctx.commit('setInfo', err)
      })
    }
  },
  mounted() {
    this.get();
  }
}
</script>

<style scoped>

</style>