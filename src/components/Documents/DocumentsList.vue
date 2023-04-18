<template>
  <div v-if="documents.data&&getTypes">
    <div class="documents-header">
      <div class="sort-filter">
        <div class="showed-items">Показано <span>{{ documents.total!==0 ? documents.per_page*(documents.current_page-1)+1 : '0' }}</span> - <span>{{ documents.per_page*(documents.current_page-1)+documents.data.length }}</span> документи із <span>{{ documents.total }}</span> знайдених</div>
        <div class="page-counter-control">
          <label>На сторінці</label>
          <select v-model="documents.per_page">
            <option v-for="y in documents.per_page" :key="y">
              {{ y }}
            </option>
          </select>
        </div>
      </div>
      <nav-filtration v-if="$route.query" />
    </div>
    <div class="not-found-document-panel" v-if="documents.total === 0">Документи не знайдено</div>
    <div v-else>
      <document-item class="document-list-item" :document="document" v-for="document in documents.data"/>
      <pagination :paginate="paginate(documents)"/>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/Documents/Pagination"
import citation from "../additional/CitationStyle"
import DocumentItem from "@/components/Documents/DocumentItem";
import {mapGetters} from "vuex";
import NavFiltration from "@/components/Documents/Filters/NavFiltration";

export default {
  props: {
    documents: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['getTypes']),
  },
  methods: {
    paginate(item) {
      const {data, links, ...paginateObj} = item;
      return paginateObj
    },
  },
  components: {
    NavFiltration,
    DocumentItem,
    citation,
    pagination
  },
  mounted() {
    let i = Object.assign({},this.documents)
    // i.splice(i.indexOf(i.data), 1);
    console.log('i', i);
  }
}
</script>

<style scoped>

.showed-items{
  display: flex;
  align-self: center;
}
.list-item {
  display: flex;
  flex-direction: column;

  padding: 10px;
  margin: 1rem 5px;
  border-radius: 3px;
  border: 1px solid #212121;
}

.page-counter-control{
  display: flex;
  align-items: center;
}

.page-counter-control > label{
  margin-right: 10px;
}

.citation-view {
  font-size: 0.8em;
}

.none_item {
  color: rgba(33, 33, 33, 0.62);
}

.citation-link {
  text-decoration: none;
}

.nav-filtration{

  margin: 0.5rem 0;
}

.not-found-document-panel{
  font-size: 36px;
  text-align: center;
  /*margin-right: 20%;*/
  font-weight: bold;

}

.documents-header {
  margin: 1rem 0.5rem;
  padding: 1rem;
  display: flex;
  flex-flow: column;
  border-bottom: 1px solid #bbb;
  font-size: 18px;
  color: #24292F;
}
.sort-filter{
  display: flex;
  justify-content: space-between;
}
.sort-filter >:nth-child(1) > span{
  font-weight: bold;
}
.nav-filter-items{
  justify-self: right;
}
.page-counter-control select{
  /*border: 1px solid #bbb;*/
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
}

</style>
