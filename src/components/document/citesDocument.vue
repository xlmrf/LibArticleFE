<template>
<div >
  <span class="cite-frame" v-if="cites.document_citation" @click="showAllCites">Посилань<span>{{ cites.document_citation.value }}</span></span>
  <cites-modal v-if="openModal" @close-modal="openModal = false"/>
</div>
</template>

<script>
import router from "@/router";
import {mapState} from 'vuex'
import axios from "axios";
import DocumentRefs from "@/components/document/documentRefs";
import PulseLoader from "@/components/additional/pulseLoader";
import CitesModal from "@/components/document/citesModal";

export default {
  components: {CitesModal, PulseLoader, DocumentRefs},
  props:['getDocument'],

  data(){
    return{
      cites:{},
      openModal:false,
    }
  },

  methods:{
    citesDocument(){
      let id = router.currentRoute.value.params.id
      axios.get(this.api_url_v1 + '/report/document-citation/' + id).then(response => {
        this.cites = response.data
        console.log(this.cites, 'cites');
      }, err => {
        console.log('cites error:',err);
      })
    },

    showAllCites(){
      this.openModal = true
    },
  },

  computed:{
    ...mapState(['api_url_v1']),
  },
  mounted() {
    this.citesDocument()
  }
}
</script>

<style scoped>


</style>

