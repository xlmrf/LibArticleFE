<template>
  <div class="documents-header">
    <div class="sort-filter">
      <div class="showed-items">Показано<span>{{ documents.total!==0 ? documents.per_page*(documents.current_page-1)+1 : '0' }}</span> - <span>{{ documents.per_page*(documents.current_page-1)+documents.data.length }}</span>документи із<span>{{ documents.total }}</span>знайдених</div>
      <div class="select-control">
        <label class="top-filter-label">Сортувати по</label>
        <select class="select top-filter-select" v-model="sortSelect">
<!--          <option selected value> &#45;&#45; select an option &#45;&#45; </option>-->
          <option class="filter-option" v-for="value in sortDocuments" :key="value">
            {{ value }}
          </option>
        </select>
      </div>
      <div class="select-control">
        <label class="top-filter-label">На сторінці</label>
        <select class="select top-filter-select" v-model="per_page">
          <option v-for="count in getPageCountPaginate" :key="count">
            {{ count }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props:['documents'],

  data(){
    return{
      per_page:this.$route.query.perPage ? this.$route.query.perPage : 10,
      sortDocuments: {
        popular: 'переглядах',
        date_start: 'даті ↓',
        date_end: 'даті ↑',
        name: 'назві',
      },
      sortSelect: 'переглядах'
    }
  },
  computed: {
    ...mapGetters(['getTypes','getPageCountPaginate']),

  },
  watch: {
    '$route.fullPath': {
      handler(item) {
        let q = '';
        if (this.$route.fullPath.split('?')[1]) {
          q = '?' + this.$route.fullPath.split('?')[1];
        }
      }
    },
    per_page(){
      let query = Object.assign({}, this.$route.query);


      // this.$route.push('/')
      this.$router.push({
        name: 'documents',
        query: {...query, ...{'perPage':this.per_page}}
      })

    },
    sortSelect(){
      this.selectItem()
    }
  },
  methods: {
    paginate(item) {
      const {data, links, ...paginateObj} = item;
      return paginateObj
    },
    selectItem() {
      let query = Object.assign({}, this.$route.query);

      let sortKey = Object.keys(this.sortDocuments).find(key => this.sortDocuments[key] === this.sortSelect)

      this.$router.push({
        name: 'documents',
        query: {...query, ...{'sort':this.sortSelect ? sortKey : 'popular'}}
      })
    },
  },
  mounted() {
    this.sortSelect = this.$route.query.sort ? this.sortDocuments[this.$route.query.sort] : 'за популярністю'
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

.nav-filtration{

  margin: 0.5rem 0;
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
  font-size: 0.9em;
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