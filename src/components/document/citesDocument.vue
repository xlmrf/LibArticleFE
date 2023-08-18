<template>
<div >
  <span class="cite-frame frame" v-if="cites.document_citation" @click="showAllCites">{{ this.$store.getters.getLanguage.document.characteristic.cites }}<span>{{ cites.document_citation.value }}</span></span>
  <modal-window component="citesModal" v-if="openModal" @close-modal="openModal = false"/>
</div>
</template>

<script>
import router from "@/router";
import {mapState} from 'vuex'
import axios from "axios";
import DocumentRefs from "@/components/document/documentRefs";
import PulseLoader from "@/components/additional/pulseLoader";
import CitesModal from "@/components/document/citesModal";
import ModalWindow from "@/components/additional/modalWindow";

export default {
  components: {ModalWindow, CitesModal, PulseLoader, DocumentRefs},
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
    console.log('cites docu')
    this.citesDocument()
  }
}
</script>

<style scoped>


</style>

