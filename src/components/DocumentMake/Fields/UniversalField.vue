<template>
  <div>
    <input type="text" class="sample-input" name="" id="" v-model="getDocument[field]">
    <div class="text-error error-area-text" v-if="invalid">{{ $store.getters.getLanguage.document_make.field_error[invalid] }}</div>
{{componentName}}awef
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
      componentName: this.getDocument
    }
  },
  watch:{
    isReady(){
      if (this.isReady)
        this.validation()
    },
    componentName:{
      handler(i){
        console.log(i)
      }
    },
  },
  methods: {

    validation() {

      if (!this.getDocument[this.field]) {
        this.invalid = 'none_'+this.field
        this.$emit('catchValidate', this.field)
        this.getDocument.keywords = []
      }
    },
  },
  computed: {
    ...mapGetters(['getDocument'])
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