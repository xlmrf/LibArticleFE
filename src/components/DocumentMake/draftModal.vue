<template>
  <div class="modal-component draft-modal">
    <div class="top-modal">
      <h3>{{$store.getters.getLanguage.document_make.draftModal.topTitle}}</h3>
      <div>Записів:<span v-if="drafts.length > 0">{{drafts.length}}</span></div>
    </div>
    <div class="modal-component-body drafts-panel">
      <div v-for="(draft,idx) in drafts" v-if="drafts.length > 0">
<!--        <span class="doc-counter">{{idx+1}}.</span>-->
        <draft-document-item :documentItem="draft" />
      </div>
      <pulse-loader class="drafts-loader" v-else/>
    </div>
  </div>
</template>

<script>
import DocumentItem from "@/components/Documents/DocumentItem";
import pulseLoader from "@/components/additional/pulseLoader";
import {mapState} from "vuex";
import DraftDocumentItem from "@/components/DocumentItemComponents/DraftDocumentItem";
export default {
  components:{DraftDocumentItem, pulseLoader, DocumentItem},

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

.drafts-panel > div{
  position: relative;

}

.top-modal{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 1.3em;
  color: #333333;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}

.top-modal > h3{
  font-weight: lighter;
}

.top-modal > div{
  position: absolute;
  margin: 0 10px;
  font-size: 1.1em;
  left: 15px;
}
.top-modal > div > span{
  margin-left: 0.3rem;
}
.doc-counter{
  font-size: 1.3em;
  position: absolute;
  /*bottom: calc(0 - 21px);*/
  top: 54px;
  color: #444444;
  cursor: default;
  right: calc(100% - 41px);
  z-index: 8;
}

</style>