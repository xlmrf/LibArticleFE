<template>
  <div class="middle-spinner" v-if="!getDocument.category">
    <span><loader width="4" radius="20"></loader></span>
  </div>
  <div v-else>
    <h4>stage 2</h4>
<!--    <div v-for="item in fields[getDocument.type]">-->
<!--    </div>-->
    <div class="form-item"
         v-for="(item,idx) in getDocument.category.fields"
    >
      <label :for="item">{{translateAreas(item)}}</label>
      <component :is="item+'-field'"></component>

<!--      <div class="author-fill-list" v-if="item === 'authors'">-->
<!--        <author-field @newAuthor="setAuthors"></author-field>-->
<!--      </div>-->
    </div>
<!--    <author-field />-->
<!--    <keywords-field />-->
<!--    <year-field />-->
  </div>
</template>

<script>
import AuthorsField from "@/components/DocumentMake/Fields/AuthorsField";
import KeywordsField from "@/components/DocumentMake/Fields/KeywordsField";
import PagesField from "@/components/DocumentMake/Fields/PagesField";
import YearField from "@/components/DocumentMake/Fields/DateField";
import {mapGetters} from "vuex";
import loader from "@/components/additional/LoaderComponent";
export default {
  mixins:['translate'],
  data(){
    return {
      fields:{Article:[AuthorsField,KeywordsField,YearField]}
    }
  },
  methods:{
    setAuthors(value){
      this.document.authors = value
    },
  },
  computed: {
    ...mapGetters(['getDocument','getCategories'])
  },
  components: {loader, YearField, KeywordsField, AuthorsField,PagesField}
}
</script>

<style scoped>

</style>