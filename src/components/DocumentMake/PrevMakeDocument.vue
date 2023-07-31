<template>
  <div>
    <title-field :error="titleError"/>
    <type-field  />
    <div class="drafts">
      <span class="drafts-label" @click="showDrafts"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></span>
      <div v-if="draftTumbler">
        <p>Документи в архіві</p>
        <div v-for="document in drafts">
          <document-item :document="document" type="draft" />
        </div>
      </div>
    </div>
    <div style="clear: both">
      <button @click="createDocument()" class="choose-type choose-btn-able" :class="['choose-type',{'disable-btn':loader||!BtnValid}]" :disabled="loader">Створити</button>
    </div>
    <div class="middle-spinner" v-if="loader">
      <span><loader width="4" radius="20"></loader></span>
    </div>
  </div>
</template>

<script>
import TitleField from "@/components/DocumentMake/Fields/TitleField";
import TypeField from "@/components/DocumentMake/Fields/TypeField";
import Loader from "@/components/additional/loader"
import {mapGetters, mapState} from "vuex";
import DocumentsList from "@/components/Documents/DocumentsList";
import DocumentItem from "@/components/Documents/DocumentItem";
export default {
  data(){
    return{
      loader:false,
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
    showDrafts(){
      this.draftTumbler = !this.draftTumbler
    },
    createDocument(){
      if (!this.getDocument.title){
        this.titleError = 'empty_field'
      }
      else{
        this.$emit('next')
      }
    }
  },
  computed:{
    ...mapGetters(['getDocument','getErrorMessage']),
    ...mapState(['api_url_v1']),
    BtnValid(){
      return this.btn_enabled = !!(this.getDocument.type_id && this.getDocument.title);
    },

    getArchiveDocs(){
      axios.get(this.api_url_v1+'/drafts').then((response) => {
        this.drafts = response.data
      }).then(error => {
        console.log(error);
      })
    }
  },
  name: "DocumentType",
  components: {DocumentItem, DocumentsList, TypeField, TitleField, Loader},

  mounted() {
    this.getArchiveDocs
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
  margin-left: auto;
  border-radius: 6px;
  width: 42px;
  height: 42px;
  display: flex;
  cursor: pointer;
}
.drafts-label-active{
  background: #d2d2d2;
}

.drafts-label:hover{
  background: #ececec;
}

.drafts-label > svg{
  margin: auto;
}
</style>