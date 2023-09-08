<template>
  <div class="views-part">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    <span v-if="views.document_views">{{ views.document_views.value }}</span>
  </div>
</template>

<script>
import router from "@/router";
import {mapState} from 'vuex'
import axios from "axios";

export default {
  props:['documentId', 'type'],

  data(){
    return{
      views:{}
    }
  },

  methods:{
    viewsDocument(){
      axios.get(this.api_url_v1 + '/report/document-views/' + this.documentId).then(response => {
        this.views = response.data
      }, err => {
        console.log('views error:',err);
      })
    },
  },
  computed:{
    ...mapState(['api_url_v1'])
  },
  mounted() {
    this.viewsDocument()
  }
}
</script>

<style scoped>

.views-part{
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  width: fit-content;
  left: calc(95% - 35px);
  bottom: 12px;
}

.views-part > span{
  /*font-weight: bold;*/
  color: #444444;
  margin: 0 3px;
}

</style>