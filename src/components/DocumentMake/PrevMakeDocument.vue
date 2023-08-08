<template>
  <div>
    <title-field :error="titleError"/>
    <type-field  />
    {{getDocumentMakeWarning?.errors?.find(item => item.attribute === 'title')}}
    <div class="drafts">
      <span class="drafts-label" :class="{'drafts-label-active':draftTumbler}" @click="showDrafts"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg><span>Незакінченні</span></span>
      <div class="drafts-panel" v-if="draftTumbler">
        <div v-for="draft in drafts" v-if="drafts.length > 0">
          <document-item :documentItem="draft" type="draft" />
        </div>
        <pulse-loader class="drafts-loader" v-else/>
      </div>

    </div>
    <div style="clear: both">
      <button @click="createDocument()" class="choose-type choose-btn-able" :class="['choose-type',{'disable-btn':loader||!BtnValid}]" :disabled="loader">{{$route.params.id ? 'Перейти' : 'Створити'}}</button>
    </div>
    <div class="middle-spinner" v-if="loader">
      <span><loader width="4" radius="20"></loader></span>
    </div>

    <title-warning v-if="titleModal" @close-modal="titleModal = false" @createToDespite="createDocument"/>
  </div>
</template>

<script>

import TitleWarning from "@/components/DocumentMake/TitleWarning";
import TitleField from "@/components/DocumentMake/Fields/TitleField";
import TypeField from "@/components/DocumentMake/Fields/TypeField";
import Loader from "@/components/additional/loader"
import {mapGetters, mapState} from "vuex";
import DocumentsList from "@/components/Documents/DocumentsList";
import DocumentItem from "@/components/Documents/DocumentItem";
import PulseLoader from "@/components/additional/pulseLoader";
export default {
  data(){
    return{
      loader:false,
      titleModal: false,
      btn_enabled: false,
      draftTumbler: false,
      titleError: '',
      drafts:[]
    }
  },
  emits:['next','loader'],
  methods:{
    LoadingBtn(option){
      this.loader = option
    },
    closeDraftWindow(e){
      if (e.target.className === 'drafts')
      {
        this.draftTumbler = false
      }
    },
    showDrafts(){
      this.getDraftDocs
      this.draftTumbler = !this.draftTumbler
    },
    createDocument(e){
      if (!this.getDocument.title){
        this.titleError = 'empty_field'
      }
      else{
        console.log("prev");
        this.$emit('next', e)
      }
    },
    // showAllCites(){
    //   this.openModal = true
    // },
  },
  watch:{
    getDocumentMakeWarning(){
      // console.log('error');
      // if (this.getDocumentMakeWarning.errors?.find(item => item.attribute === 'title')){
      //   console.log('error23');
        this.titleModal = true
      // }
    },
  },
  computed:{
    ...mapGetters(['getDocument','getErrorMessage', 'getDocumentMakeWarning']),
    ...mapState(['api_url_v1']),
    BtnValid(){
      return this.btn_enabled = !!(this.getDocument.type_id && this.getDocument.title);
    },

    getDraftDocs(){
      axios.get(this.api_url_v1+'/drafts').then((response) => {
        this.drafts = response.data
      }).then(error => {
        console.log(error);
      })
    }
  },
  name: "DocumentType",
  components: {PulseLoader, DocumentItem, DocumentsList, TypeField, TitleField, Loader, TitleWarning},
  mounted() {
    window.addEventListener('click', this.closeDraftWindow, false)
  },
  beforeDestroy () {
    window.removeEventListener('click',this.closeDraftWindow, false)
  }
}
</script>

<style scoped>

.choose-type{
  text-align: center;
  text-transform: uppercase;
  /*transition: 0.5s;*/
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  display: block;
  font-size: 16px;
  margin:2.5rem auto;
  align-self: end;
  padding: 1rem 4rem;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s ease all;
  -moz-transition: 0.5s ease all;
  -webkit-transition: 0.5s ease all;
}
.choose-btn-able{
  /*background-image: linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%);*/
  background: #0969DA;
}

.drafts{
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  flex-flow: column;
}

.drafts-label{
  position: relative;
  right: 20px;
  margin-left: auto;
  border-radius: 6px;
  padding: 5px;
  align-items: center;
  /*width: 42px;*/
  height: 42px;
  display: flex;
  cursor: pointer;
}
.drafts-label > span{
  font-size: 1.1em;
  margin: 0 5px;
}
.drafts-label:hover{
  background: #ececec;
}

.drafts-label-active{
  background: #e2e2e2;
}

.drafts-label > svg{
  margin: auto;
}

.drafts-panel{
  border-radius: 6px;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  font-size: 0.8em;
  height: 220px;
  width: 200px;
  overflow: auto;
  scrollbar-width: thin;
  z-index: 10;

}
.drafts-panel > p{
  color: #535353;
  font-size: 1em;
  padding: 5px 0;
  margin: 0 auto;
}

.drafts-panel > div{
  /*border-radius: 3px;*/
  /*border: 1px solid #0048BA;*/
  font-size: 1em;
  display: inline-block;
  text-align: center;
  text-decoration: none;
}
.drafts-loader{
  margin: 0 auto;
  padding: 10px;
}

</style>