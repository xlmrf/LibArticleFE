<template>
  <div>
    <textarea cols="30" rows="10" class="sample-input document-description-area"
              v-model="getDocument.description"></textarea>
    <div class="text-error error-area-text" v-if="invalid">
      {{ $store.getters.getLanguage.document_make.field_error[invalid] }}
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name:'description',
  props: ['field', 'isReady'],
  emits: ['catchValidate'],
  data() {
    return {
      invalid: ''
    }
  },
  watch: {
    isReady() {
      if (this.isReady)
        this.validation()
    },
    'getDocument.description': {
      handler() {
        this.invalid = ''
      },
      deep: true
    }
  },
  methods: {

    validation() {

      if (!this.getDocument.description) {
        this.invalid = 'none_keywords'
        this.$emit('catchValidate', this.$options.name)
      }
      // else if (this.getDocument.description?.length < 40){
      //   this.invalid = 'too_few_characters'
      //   this.$emit('catchValidate', this.$options.name)
      // }
    },
  },
  computed: {
    ...mapGetters(['getDocument'])
  },
}
</script>

<style scoped>

</style>