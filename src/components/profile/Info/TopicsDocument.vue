<template>
  <div>
    <p>Популярні публікації</p>
    <div class="document-topics" v-for="item in data">
      <document-item class="s-document" :document="item"/>
<!--       <router-link :to="'/document/'+item.id">{{item.title}} </router-link> - {{item.views}}-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DocumentItem from "@/components/Documents/DocumentItem";

export default {
  components: {DocumentItem},
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
      axios.get('https://libarticle.polidar.in.ua/api/v1/report/documents-top/profile/' + this.$route.params.id).then(response => {
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
.s-document{
  font-size: 0.8em;
}
.document-topics{
  display: flex;
}
</style>