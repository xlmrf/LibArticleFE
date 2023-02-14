<template>
  <div class="middle-spinner" v-if="!getDocument.id">
    <span><loader width="4" radius="20"></loader></span>
  </div>
  <div v-else>
    <h4>stage 2</h4>

    <div class="form-item" v-for="(item,idx) in getTypes.find(type => type.id === getDocument.type_id).fields"
         :key="idx">
      <label :for="item">{{ translateAreas(item) }}</label>
      <component :is="setFields(item)" :field="item"></component>
    </div>

    <button @click="updateDocument(getDocument)">
      Update
    </button>
  </div>
</template>

<script>
import AuthorsField from "@/components/DocumentMake/Fields/AuthorsField";
import KeywordsField from "@/components/DocumentMake/Fields/KeywordsField";
import PagesField from "@/components/DocumentMake/Fields/PagesField";
import YearField from "@/components/DocumentMake/Fields/DateField";
import ReferencesField from "@/components/DocumentMake/Fields/ReferencesField";
import UniversalField from "@/components/DocumentMake/Fields/UniversalField";
import DescriptionField from "@/components/DocumentMake/Fields/DescriptionField";
import {mapActions, mapGetters} from "vuex";
import loader from "@/components/additional/LoaderComponent";

export default {
  mixins: ['translate'],
  data() {
    return {}
  },
  methods: {
    ...mapActions(['updateDocument']),
    setFields(item) {
      if (item === 'place' || item === 'edition')
        return 'universal-field';
      else
        return item + '-field';
    },
    setAuthors(value) {
      this.document.authors = value
    },
  },
  computed: {
    ...mapGetters(['getDocument', 'getTypes'])
  },
  components: {loader, YearField, KeywordsField, AuthorsField, PagesField, ReferencesField, UniversalField, DescriptionField}
}
</script>

<style scoped>

</style>