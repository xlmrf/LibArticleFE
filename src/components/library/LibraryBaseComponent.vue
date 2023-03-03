<template>
  <div class="library-page">
    <div class="left-bar">
      <filter-bar />
    </div>

<!--    <div class="middle-spinner">-->
<!--      <span><loader width="4" radius="20"></loader></span>-->
<!--    </div>-->
    <div class="library-document-list">
      <div class="none_documents" v-if="!getDocuments.total">
        <p>Документів не знайдено, додайте ваш перший документ</p>
      </div>

      <div class="document-list" v-else>
        <span>Знайдено документів: {{ getDocuments.total }}</span>
        <div v-for="article in documents">
          <list-item-document :document="article"></list-item-document>
        </div>
        <div class="paginate">
          <span class="page_tumbler"><router-link v-if="total > per_page && data.page !== first_page"
                                                  :to="pageControl(first_page)">1</router-link></span>
          <span class="page_tumbler"><router-link v-if="previous_page !== null" :to="pageControl(previous_page)"
          >&lt</router-link></span>
          <span class="page_tumbler">{{ data.page }}</span>
          <span class="page_tumbler"><router-link v-if="next_page !== null" :to="pageControl(next_page)"
          >></router-link></span>
          <span class="page_tumbler"><router-link v-if="data.page !== last_page" :to="pageControl(last_page)"
          >{{ last_page }}</router-link></span>
        </div>
      </div>
<!--      <div class="down-bar">-->

<!--      </div>-->
    </div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import FilterBar from "./lib_additional/FilterBarLibraryComponent";
import ListItemDocument from "./ItemListDocumentComponent";
import loader from "../additional/loader";

export default {
  components: {ListItemDocument, FilterBar,loader},
  data() {
    return {
      filter:{
        min_year: 0,
        max_year:0,
        categories:[],
        authors:[]
      },
      documents: [],
      previous_page: null,
      next_page: null,
      first_page: 1,
      last_page: 1,
      total: 0,
      per_page: 0,
      mistake: '',
      data: {
        page: 1,
        search: '',

      },
      key: 0
    }
  },
  methods: {
    upDocuments(key){
      this.message = ''
      if (key === 'not found') {
        return this.message = key
      }
      this.data.page = key.current_page
      this.last_page = key.last_page
      this.total = key.total
      this.per_page = key.per_page
      if (key.next_page_url !== null) {
        console.log('next');
        this.next_page = key.current_page + 1
      } else {
        this.next_page = null
      }
      if (key.prev_page_url !== null) {
        this.previous_page = key.current_page - 1
      } else {
        this.previous_page = null
      }
      this.documents = key.data
      this.filter.min_year = Math.min.apply(Math,key.data.map(item => item.year).filter(e => e !== null))
      this.filter.max_year = Math.max.apply(Math,key.data.map(item => item.year))

      let emails = key.data.map(item => item.authors.map(e => e.last_name)).flat()

      this.filter.authors = emails.filter((item,pos) => emails.indexOf(item)===pos)


      key.data.map(item => item.category_id).forEach(c => !this.filter.categories.includes(c)?this.filter.categories.push(c):'')
      console.info('Update documents complete :LibraryBase', this.getDocuments);

    },

    pageControl(page) {
      return {
        name: 'library',
        query: {...this.$route.query, ...{page: page}}
      }
    }
  },
  watch: {
    // '$route.query': {
    //     handler(){
    //       this.upDocuments(this.getDocuments)
    //     }
    // },
    getDocuments(key) {
      this.upDocuments(key)
    }
  },
  computed: {
    ...mapGetters(['getDocuments']),
  }

}
</script>

<style scoped>
.library-page{
  display: flex;
  border: 1px solid blue;
  height: 100%;
}
.left-bar{
  display: inherit;
  border-right: 1px solid #f1f1f1;
  min-width: 250px;
  width: auto;
}
.library-document-list{
  height: 100%;
  display: inherit;
  flex-direction: column;
}
.library-document-list > div{
  border: 1px solid yellowgreen;
}
.down-bar{
  margin-top: auto;
}
.library-page > div{
  /*border: 1px solid crimson;*/
}


/*/////////////////////*/


.document-list{
  /*box-shadow: rgba(0, 0, 0, 0.35) 0px -8px 12px -8px inset;*/
  /*box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;*/
  /*border-radius: 6px;*/
  /*align-self: center;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*margin: 10px;*/
  height: 100%;
  font-size: 0.8em;
  /*width: 200px;*/
  overflow: auto;
  /*overflow-y: hidden;*/
  scrollbar-width: thin;
  z-index: 10;
}
.document-list > div{
  /*border-radius: 3px;*/
  /*border: 1px solid #0048BA;*/
  font-size: 18px;
  /*display: inline-block;*/
  text-decoration: none;
}

</style>