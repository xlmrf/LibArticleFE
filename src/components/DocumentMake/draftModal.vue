<template>
  <div class="modal-component draft-modal">
    <h3>top modal</h3>
    <div class="drafts-panel">
      <div v-for="draft in drafts" v-if="drafts.length > 0">
        <document-item :documentItem="draft" type="draft" />
      </div>
      <pulse-loader class="drafts-loader" v-else/>
    </div>
  </div>
</template>

<script>
import DocumentItem from "@/components/Documents/DocumentItem";
import pulseLoader from "@/components/additional/pulseLoader";
import {mapState} from "vuex";
export default {
  components:{pulseLoader, DocumentItem},

  data(){
    return{
      openModal:false,
      drafts:[],
    }
  },

  methods:{

  },

  computed:{
    ...mapState(['api_url_v1']),
    getDraftDocs(){
      axios.get(this.api_url_v1+'/drafts').then((response) => {
        this.drafts = response.data
      }).then(error => {
        console.log(error);
      })
    }
  },

  mounted() {
    this.getDraftDocs
    console.log('draft modal open')
  }
}
</script>

<style scoped>

</style>