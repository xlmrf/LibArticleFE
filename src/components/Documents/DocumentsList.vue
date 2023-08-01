<template>
  <div>
    <div>
      <nav-header :documents="documents" />
      <nav-filtration v-if="$route.query" />
    </div>
    <div class="not-found-document-panel" v-if="documents.total === 0">Документів не знайдено</div>
    <div v-else>
      <document-item class="document-list-item" :documentItem="document" v-for="document in documents.data"/>
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
import NavHeader from "@/components/Documents/Filters/NavHeader";

export default {
  props: {
    documents: {
      type: Object

    }
  },
  computed: {
    ...mapGetters(['getTypes','getPageCountPaginate']),

  },
  methods: {
    paginate(item) {
      const {data, links, ...paginateObj} = item;
      return paginateObj
    }
  },
  components: {
    NavHeader,
    NavFiltration,
    DocumentItem,
    citation,
    pagination
  },
  mounted() {
  }
}
</script>

<style scoped>

.showed-items{
  display: flex;
  align-self: center;
}

.showed-items > span{
  margin: 0 0.33rem;
}

.list-item {
  display: flex;
  flex-direction: column;

  padding: 10px;
  margin: 1rem 5px;
  border-radius: 3px;
  border: 1px solid #212121;
}

.page-counter-control, .sort-type-control{
  display: flex;
  align-items: center;
}

.top-filter-label{
  margin-right: 10px;
}

.sort-type-control .top-filter-select{
  font-size: 1em;
  font-weight: normal;
  color: #222222;
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
  font-size: 28px;
  text-align: center;
  color: #333333;
  background: #F2F2F2;
  padding: 25px;
  /*margin-right: 20%;*/
  font-weight: bold;

}

.documents-header {
  margin: 1rem 0.5rem;
  padding: 5px 5px;
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
.top-filter-select{
  /*border: 1px solid #1C75DD;*/
  color: #1C75DD;
  border-radius: 3px;
  padding: 5px;
  font-size: 1.2rem;
  line-height: 1.1;
}
.top-filter-select > option{
  background: #f1f1f1;
}
.select-control{
  overflow: hidden;
  position: relative;
  padding: 10px 0;
}
.select-control:after{
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #1C75DD;
  position: absolute;
  top: 46%;
  right: 4px;
  content: "";
  z-index: 99;
}

.filter-option{
  text-align: center;
}

</style>
