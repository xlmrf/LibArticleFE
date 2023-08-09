<template>
  <div class="top">
    <h2>{{ $store.getters.getLanguage.document_make.signs.document_name }}</h2>
    <input ref="titleInput" type="text" required name="title" :class="['title-input',{'alert-input':error}]" id="title" placeholder="Навчальний посібник з дисципліни «Теорія ймовірностей, імовірнісні процеси та математична статистика». Курс лекцій"
           v-model="getDocument.title">
    <label for="title" v-if="error">{{ getErrorMessage[error] }}</label>
  </div>
</template>

<script>

import {mapGetters, mapState} from "vuex";
import {inject} from "vue";

export default {
  props:['error'],
  data(){
    return{
      textError:{},
      // title:''
    }
  },
 // setup(){
 //    let titleFieldError = inject('titleFieldError')
 //   return{
 //      titleFieldError
 //   }
 // },
  watch:{
    'data.title':{
      handler(){

      }
    },
    // titleFieldError(){
    //   console.log('awoeifnaweoifgn')
    // }
  },
  // inject:['titleFieldError'],
  computed: {
    ...mapState(['titleInputRef']),
    ...mapGetters(['getDocument', 'getErrorMessage', 'getTitleInput']),
  },
  // methods(){
  //
  // },
  created() {
    // this.getTitleInput = this.$refs.titleInput
  },
  mounted() {
    this.$store.commit('updateTitle', this.$refs.titleInput)
    console.log('title',this.getTitleInput)
  }
}
</script>

<style scoped>
.top h2{
  font-size: 28px;
  text-align: center;
  color: #212121;
  width: 100%;
  margin: 20px;
  padding-bottom: 10px;
}
.top{
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.top > label{
  color: rgba(229, 50, 45, 0.8);
  /*margin: 5px;*/
  font-size: 14px;
  position: absolute;
}

.title-input{
  font-size: 21px;
  padding: 10px;
  outline: #212121;
  width: 600px;
  border: 1px solid #212121;
  border-radius: 4px;
  position: relative;
  /*margin: 15px 0;*/
  /*height: 1.7rem;*/
  color: #212121;
  box-sizing: border-box;
  transition: 0.3s ease all;
  -moz-transition: 0.3s ease all;
  -webkit-transition: 0.3s ease all;
}
input:focus{
  border: 1px solid rgba(16, 89, 255, 0.9);
}
input:valid{
  border: 1px solid rgba(16, 89, 255, 0.9);
}
.alert-input{
  border: 1px solid rgba(229, 50, 45, 0.74);
}
</style>