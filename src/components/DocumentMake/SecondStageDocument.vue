<template>
  <div>
    <h4>stage 2</h4>
    <div v-for="item in fields[getDocument.type]">
      <component :is="item"></component>
    </div>
<!--    <author-field />-->
<!--    <keywords-field />-->
<!--    <year-field />-->
  </div>
</template>

<script>
import AuthorField from "@/components/DocumentMake/Fields/AuthorField";
import KeywordsField from "@/components/DocumentMake/Fields/KeywordsField";
import YearField from "@/components/DocumentMake/Fields/YearField";
import {mapGetters} from "vuex";
export default {
  data(){
    return {
      fields:{Article:[AuthorField,KeywordsField,YearField]}
    }
  },
  computed: {
    ...mapGetters(['getDocument'])
  },
  components: {YearField, KeywordsField, AuthorField}
}
</script>

<style scoped>

</style>