<template>
  <div>
    <title-field :error="titleError"/>
    <type-field  />
    {{getDocumentMakeWarning?.errors?.find(item => item.attribute === 'title')}}
    <div class="drafts">
      <span class="drafts-label" :class="{'drafts-label-active':draftTumbler}" @click="showDrafts">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#394DBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
        <span>Чернетки</span>
      </span>
      <modal-window v-if="draftTumbler" @close-modal="draftTumbler = false" component="draftModal" />

    </div>
    <div style="clear: both">
      <button @click="createDocument()" class="choose-type choose-btn-able" :class="['choose-type',{'disable-btn':loader||!BtnValid}]" :disabled="loader">{{$route.params.id ? $store.getters.getLanguage.document_make.warnings.move : $store.getters.getLanguage.document_make.warnings.create}}</button>
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
import DraftModal from "@/components/DocumentMake/draftModal";
import ModalWindow from "@/components/additional/modalWindow";
export default {
  data(){
    return{
      loader:false,
      titleModal: false,
      btn_enabled: false,
      draftTumbler: false,
      titleError: '',
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
      this.openModal = true
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

  },
  name: "DocumentType",
  components: {
    ModalWindow,
    DraftModal, PulseLoader, DocumentItem, DocumentsList, TypeField, TitleField, Loader, TitleWarning},
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
  padding: 5px 8px;
  align-items: center;
  /*width: 42px;*/
  height: 42px;
  display: flex;
  cursor: pointer;
}
.drafts-label > svg{
  position: relative;
  top: 1px;
}
.drafts-label > span{
  font-size: 1.1em;
  margin: 0 5px;
  font-weight: bold;
  color: #394DBB;
}
.drafts-label:hover{
  background: rgba(148, 154, 187, 0.22);
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

.item-reference{
  margin-top: 15px;
}

.top-modal-window{
  display: flex;
  position: relative;
  flex-flow: column;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #A9A9A995;
}

.top-modal-window > input{
  margin-top: 15px;
  padding: 5px 6px;
  font-size: 1em;
}

.top-modal-window > svg{
  position: absolute;
  right: 20px;
  bottom: 15px;
}

.cites-modal {
  display: block;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.modalActive {
  position: absolute;
  overflow-y: auto;
  width: 60%;
  top: 60px;
  left: 20%;
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
  z-index: 999;
  min-height: 300px;
  height: calc(100% - 65px);
}

.modalClose {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
  top: 9px;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  cursor: pointer;
  z-index: 99;
}

.modalClose:hover{
  /*stroke: #222222;*/
  background: rgba(169, 169, 169, 0.4);
}

.modalWindow {
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  overflow-y: auto;
}

.top-modal-window > h3{
  margin-left: auto;
  margin-right: auto;
  font-weight: normal;
}

.cite-frame{
  display: flex;
}

.cite-frame > span{
  font-weight: bold;
  color: #333333;
}


.files-tape{
  /*box-shadow: rgba(0, 0, 0, 0.35) 0px -8px 12px -8px inset;*/
  /*box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;*/
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  overflow: auto;
  /*overflow-y: hidden;*/
  /*scrollbar-width: thin;*/
  z-index: 10;
}
.files-tape > div{
  padding: 15px;
  /*border-radius: 3px;*/
  /*border: 1px solid #0048BA;*/
  font-size: 18px;
  display: inline-block;
  text-decoration: none;
}

.files-tape > button{
  display: flex;
  width: fit-content;
  margin: 8px auto;
  background: transparent;
  font-size: 1.1em;
  padding: 2px;
  color: #222222;
  border-bottom: 1px solid #222222;
  cursor: pointer;
}

.pulse-loader{
  display: flex;
  justify-content: center;
  padding: 10px;
}

</style>