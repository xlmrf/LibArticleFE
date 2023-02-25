<template>
  <div class="top">
    <h2>Назва документу</h2>
    <label for="title" v-if="wrongInput">{{wrongInput}}</label>
    <input type="text" name="title" :class="['title-input',{'alert-input':wrongInput}]" id="title" placeholder="Навчальний посібник з дисципліни «Теорія ймовірностей, імовірнісні процеси та математична статистика». Курс лекцій" v-model="getDocument.title">
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data(){
    return{
      wrongInput:''
    }
  },
  watch:{
    'data.title':{
      handler(){
        this.wrongInput = ''
      }
    }
  },
  computed: {
    ...mapGetters(['getDocument'])
  },
}
</script>

<style scoped>
.top h2{
  font-size: 28px;
  text-align: center;
  color: #212121;
  width: 100%;
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
.type-document-modal input:focus{
  border: 1px solid rgba(16, 89, 255, 0.9);
}
.alert-input{
  border: 1px solid rgba(229, 50, 45, 0.74);
}
</style>