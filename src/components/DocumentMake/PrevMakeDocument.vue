<template>
  <div>
    <title-field wrong-input=""/>
    <type-field />
    <div>
      <p>Документи в архіві</p>
      <div v-if="drafts">
        {{drafts}}
      </div>
    </div>
    <div style="clear: both">
      <button @click="$emit('next')" class="choose-type choose-btn-able" :class="['choose-type',{'disable-btn':loader||!BtnValid}]" :disabled="loader||!BtnValid">Обрати</button>
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
export default {
  data(){
    return{
      loader:false,
      btn_enabled: false,
      drafts:[]
    }
  },
  emits:['next','loader'],
  methods:{
    LoadingBtn(option){
      this.loader = option
    }
  },
  computed:{
    ...mapGetters(['getDocument']),
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
  components: {TypeField, TitleField, Loader},

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
</style>