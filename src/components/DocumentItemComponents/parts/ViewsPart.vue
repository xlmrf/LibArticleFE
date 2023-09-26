<template>
  <div class="views-part">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    <span v-if="article.views">{{ article.views.unique_views }}</span>
  </div>
</template>

<script>
import router from "@/router";
import {mapState} from 'vuex'
import axios from "axios";

export default {
  props:['article', 'type'],

  data(){
    return{
      views:{}
    }
  },

  methods:{
    // viewsDocument(){
    //   axios.get(this.api_url_v1 + '/report/document-views/' + this.documentId).then(response => {
    //     this.views = response.data
    //   }, err => {
    //     console.log('views error:',err);
    //   })
    // },
  },
  computed:{
    ...mapState(['api_url_v1'])
  },
  mounted() {
    // this.viewsDocument()
  }
}
</script>

<style scoped>

.views-part{
  /*font-weight: bold;*/
  display: flex;
  cursor: pointer;
  color: #444444;
}

.views-part > svg{
  position: relative;
  margin: 0 3px;
}

</style>