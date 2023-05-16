<template>
  <div class="middle-spinner" v-if="watcher">
    <span><loader width="4" radius="20"></loader></span>
  </div>
  <div v-else>

    <div class="card-top">
      <h2 :style="{ 'font-size': '22px' }" ref="refTitle">{{ getDocument.title }}</h2>
      <h4>{{ getTypes.find(type => type.id === getDocument.type_id)?.name }}</h4>
      <!--      <h4>{{getDocument}}</h4>-->
      <span class="rename-title-btn" @click="$emit('prev')">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg></span>
    </div>

    <div class="fill-areas-document">
      <files-frame-component/>

      <div class="fill-areas">
        <div class="form-item" v-for="(item,idx) in getTypes.find(type => type.id === getDocument.type_id)?.fields"
             :key="idx">
          <label :for="item">{{ translateAreas(item) }}</label>
          <component :is="setFields(item)" :field="item" :is-ready="isReady"></component>
        </div>
        <button class="button conclusion-btn" @click="update()">
          Зберегти документ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorsField from "@/components/DocumentMake/Fields/AuthorsField";
import KeywordsField from "@/components/DocumentMake/Fields/KeywordsField";
import PagesField from "@/components/DocumentMake/Fields/PagesField";
import Publication_dateField from "@/components/DocumentMake/Fields/DateField";
import ReferencesField from "@/components/DocumentMake/Fields/ReferencesField";
import UniversalField from "@/components/DocumentMake/Fields/UniversalField";
import DescriptionField from "@/components/DocumentMake/Fields/DescriptionField";
import {mapActions, mapGetters} from "vuex";
import loader from "@/components/additional/loader";
import FilesFrameComponent from "@/components/DocumentMake/Fields/FilesFrameComponent";

export default {
  emits: ['prev'],
  mixins: ['translate'],
  data() {
    return {
      isReady: false
    }
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
    fontSize(e, text) {
      if (e.refTitle != undefined) {
        console.log(text.length);
        console.log(e.refTitle.clientWidth);
      }
      // console.log(this.$el.contains(e.target))
      return '22px';
    },

    update(){
      this.isReady = true
      let document = this.getDocument
      document.files = this.getFiles
      console.log('doc',document)
      this.updateDocument(document)
    }
  },
  computed: {
    ...mapGetters(['getDocument', 'getTypes','getFiles']),
    watcher(){
      return !this.getDocument.id;
    },
    resetDocument() {

      // let document = JSON.parse(localStorage.getItem('not_finished_document'))
      // let new_document = Object.assign(document,this.document)
      // localStorage.setItem('reset_document',JSON.stringify(new_document))
    },
  },
  components: {
    FilesFrameComponent,
    loader, Publication_dateField, KeywordsField, AuthorsField, PagesField, ReferencesField, UniversalField, DescriptionField
  }
}
</script>

<style scoped>
.conclusion-btn{
  border-radius: 3px;
  border: 1px solid #525252;
  color: #222222;
  padding: 0.5rem 1rem;
  margin-right: auto;
  margin-left: auto;
}

.fill-areas-document {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.fill-areas{
  display: flex;
  flex-flow: column;
}

.fill-areas-document > div {
  flex: 1 400px;
  margin: 0 1.3rem;
}

</style>