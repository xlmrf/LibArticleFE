<template>
  <div>
    <input type="text" class="sample-input" name="" id="" v-model="getMakeDocument[field]" :class="{'sample-input-error':invalid}">
    <div class="text-error error-area-text" v-if="invalid">{{ $store.getters.getLanguage.document_make.field_error[invalid] }}</div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: ['field','isReady'],
  name: 'universal',
  data(){
    return{
      invalid:'',
    }
  },
  watch:{
    isReady(){
      if (this.isReady)
        this.validation()
    },
    'getMakeDocument.edition':{
      handler(i){
        this.invalid = ''
      }
    },
    'getMakeDocument.place':{
      handler(i){
        this.invalid = ''
      }
    },
  },
  methods: {

    validation() {

      if (!this.getMakeDocument[this.field]) {
        this.invalid = 'none_'+this.field
        this.$emit('catchValidate', this.field)
      }
    },
  },
  computed: {
    ...mapGetters(['getMakeDocument'])
  },
}
</script>

<style scoped>
label{
  position: absolute;
  top: -20px;
}
div{
  position: relative;
}
</style>