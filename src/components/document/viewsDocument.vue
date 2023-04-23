<template>

  <span class="view-frame" v-if="views.document_views">Перегляди <span>{{ views.document_views.value }}</span></span>

</template>

<script>
import router from "@/router";
import {mapState} from 'vuex'
import axios from "axios";

export default {

  data(){
    return{
      views:{}
    }
  },

  methods:{
    viewsDocument(){
      let id = router.currentRoute.value.params.id
      axios.get(this.api_url_v1 + '/report/document-views/' + id).then(response => {
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

.view-frame{
  display: flex;
}

.view-frame > span{
  font-weight: bold;
  color: #333333;
}

</style>