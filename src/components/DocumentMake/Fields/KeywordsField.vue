<template>
  <div class="complex-item-control">
    <span>
      <input type="text" class="sample-input" :id="keyword" v-model="keyword" @keypress.enter="addKeyword" :class="{'sample-input-error':localError}">
      <span class="add-btn" @click="addKeyword">{{ this.$store.getters.getLanguage.document_make.signs.add_btn}}</span>
    </span>
    <small class="local-error-text">{{ localError }}</small>
    <div :class="['list-keywords',{'list-able':this.getDocument.keywords}]" v-if="this.getDocument.keywords?.length > 0">
      <li v-for="(el,idx) in getDocument.keywords">
        {{ el }}
        <small @click="deleteKeyword(idx)">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </small>
      </li>
    </div>
  </div>
  <div class="text-error error-area-text border-error" v-if="invalid">{{ $store.getters.getLanguage.document_make.field_error[invalid] }}</div>
  <!--  <div>-->
  <!--    <small>keywords</small>-->
  <!--    <input type="text" name="" id="" v-model="getDocument.keywords">-->
  <!--  </div>-->
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name:'keywords',

  props:['isReady', 'field'],
  emits:['catchValidate'],

  data() {
    return {
      keyword: '',
      localError:'',
      invalid: ''
    }
  },
  watch:{
    keyword(){
      this.localError = ''
    },
    isReady(){
      if (this.isReady)
        this.validation()
    },
    'getDocument.keywords':{
      handler(){
        if (this.getDocument.keywords && this.getDocument.keywords.length > 0) {
          this.invalid = ''
        }
      },
      deep:true
    }
  },
  methods: {

    validation(){

      if (!this.getDocument.keywords || this.getDocument.keywords.length < 1){
        this.invalid = 'none_keywords'
        this.$emit('catchValidate', this.$options.name)
        this.getDocument.keywords = []
      }
    },

    addKeyword() {
      if (this.keyword === '' || this.keyword === undefined) {
        this.localError = this.$store.getters.getLanguage.common['empty_field']
      }
      else if (this.keyword.length < 3){
        this.localError = this.$store.getters.getLanguage.common['too_few_characters']+'3'
      }
      else {
        if (this.localError) {
          this.localError = ''
        }
        if (this.getDocument.keywords === undefined||this.getDocument.keywords === null) {
          this.getDocument.keywords = [];
        }
        this.getDocument.keywords.push(this.keyword)
        this.keyword = ''
      }
    },
    deleteKeyword(idx) {
      this.getDocument.keywords.splice(idx, 1)
    },
  },
  computed: {
    ...mapGetters(['getDocument'])
  },
  // mounted() {
  //   if (!this.getDocument.keywords){
  //     this.getDocument.keywords = []
  //     console.log(this.getDocument.keywords.length);
  //   }
  // }
}
</script>

<style scoped>
.local-error-text{
  /*margin: 5px 5px 0 5px;*/
}
</style>