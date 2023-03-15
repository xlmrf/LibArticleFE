<template>
  <div>
    <title-field wrong-input=""/>
    <type-field />
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
import {mapGetters} from "vuex";
export default {
  data(){
    return{
      loader:false,
      btn_enabled: false
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
    BtnValid(){
      return this.btn_enabled = !!(this.getDocument.type_id && this.getDocument.title);
    }
  },
  name: "DocumentType",
  components: {TypeField, TitleField, Loader}
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
.disable-btn{
  /*background-image: linear-gradient(to right, rgba(129, 131, 132, 0.36) 0%, rgba(103, 116, 116, 0.33) 51%, rgba(129, 131, 132, 0.33) 100%);*/
  background: rgba(129, 131, 132, 0.36);
  cursor: default;
}
</style>