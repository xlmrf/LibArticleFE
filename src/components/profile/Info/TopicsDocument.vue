<template>
  <div>
    <p class="chapter-header">Популярні публікації</p>
    <div class="document-topics">
      <document-item class="s-document" v-for="item in data" :document="item" :isProfile="true"/>
<!--       <router-link :to="'/document/'+item.id">{{item.title}} </router-link> - {{item.views}}-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DocumentItem from "@/components/Documents/DocumentItem";
import {mapGetters} from "vuex";

export default {
  components: {DocumentItem},
  data() {
    return {
      data: []
    }
  },
  watch: {
    // '$route.params.id': {
    //   handler(item) {
    //     this.get();
    //   }
    // }
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
  computed:{
    ...mapGetters(['getUser'])
  },
  mounted() {
    this.get();
  }
}
</script>

<style scoped>
p{

}
.s-document{
  font-size: 0.8em;
  border: 1px solid #BFBFBFD8;
  color: #9A9A9A;
  border-radius: 5px;
  margin: 5px;
  width: 48%;
  flex: auto;
}
.document-topics{
  display: flex;
  flex-flow: row wrap;
}
</style>