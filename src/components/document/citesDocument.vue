<template>

  <span class="cite-frame" v-if="cites.document_citation">Посилань<span>{{ cites.document_citation.value }}</span></span>

</template>

<script>
import router from "@/router";
import {mapState} from 'vuex'
import axios from "axios";

export default {

  data(){
    return{
      cites:{}
    }
  },

  methods:{
    citesDocument(){
      let id = router.currentRoute.value.params.id
      axios.get(this.api_url_v1 + '/report/document-citation/' + id).then(response => {
        this.cites = response.data
      }, err => {
        console.log('cites error:',err);
      })
    },
  },
  computed:{
    ...mapState(['api_url_v1'])
  },
  mounted() {
    this.citesDocument()
  }
}
</script>

<style scoped>

.cite-frame{
  display: flex;
}

.cite-frame > span{
  font-weight: bold;
  color: #333333;
}

</style>