<template>
  <div class="filter-bar">

    <div class="select-search-area">
      <h4>Вибрати документи:</h4>
        <label class="save-session">
          <input type="radio" v-model="only_own" value="false" @change="query({only_own: only_own})" name="only_own" id="">
          <span class="label">Всі</span>
        </label>
        <label class="save-session">
          <input type="radio" v-model="only_own" value="true" @change="query({only_own: only_own})" name="only_own" id="save-user">
          <span class="label">Тільки мої</span>
        </label>
    </div>

    <div>
      <h4>Рік:</h4>
      <span class="years-panel">
        <input v-model="filter.min_year"> - <input v-model="filter.max_year">
      </span>
    </div>

    <div>
      <h4>Категорії</h4>
      <span class="files-tape">
        <label v-for="(category,key) in getCategories.filter(e => filter.categories.includes(e.id))" class="save-session">
            <input type="checkbox"
                   @input="selected_categories.find(e => e === category.name) ?
                           selected_categories.splice(selected_categories.indexOf(category.name),1) :
                           selected_categories.push(category.name)"
                   @change="query({categories: selected_categories})"
                   :name="category.name" :id="category.name">
            <span class="label">{{category.name}}</span>
        </label>
      </span>
    </div>

    <div>
      <h4>Автори</h4>
      <span class="document-list">
          <label class="save-session" v-for="author in filter.authors">
            <input type="checkbox" name="author" >
            <span class="label">{{ author }}</span>
          </label>
        </span>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  // props:['filter'],
  data(){
    return{
      filter:{
        max_year: '',
        min_year: '',
        categories: ''
      },
      selected_categories:[],
      only_own: this.$route.query.only_own ? this.$route.query.only_own : false,
    }
  },
  methods:{
    ...mapActions(['DocumentSearcher','requestCategories','FilterDocuments']),

    query(data) {
      let query = Object.assign({}, this.$route.query);
      if (query.search){
        delete query.search
      }

      delete query.page;

      setTimeout(() => {
        this.$router.push({
          name: 'library',
          query: {...query, ...data}
        })
      })
    },
  },
  watch:{
    '$route.query': {
      handler() {
        this.inquire
      }
    },
  },
  computed:{

    ...mapGetters(['getCategories','getFilter']),
    inquire(){
      return this.FilterDocuments(this.$route.query)
      // return this.DocumentSearcher(this.$route.query)

      // Object.entries(this.$route.query).forEach((p, idx) => {
      //   idx === 0 ? q = '?' : q += '&'; q += p.join('=');
      // })
    }
  },
  mounted() {
    this.inquire
    this.requestCategories()
  }
}
</script>

<style scoped>
.filter-bar{
  margin: 0.2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  /*overflow-y: hidden;*/
  scrollbar-width: thin;
}

.filter-bar > *{
  display: inherit;
  flex-direction: column;
  /*border-bottom: 1px solid #f1f1f1;*/
}



.filter-bar > div > span{
  /*display: none;*/
  margin: 0 0.8rem;
}

.years-panel > input{
  border: 1px solid #999;
  font-size: 1.2em;
  width: 50px;
  height: 30px;
}

.select-search-area{
  border: 1px solid rgb(238, 203, 90);
  border-radius: 4px;
  margin: 0.5rem 0;
  /*flex-direction: column;*/
}

.select-search-area > label{
  margin: 0.5rem 0.8rem;
}

.save-session>input{
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.save-session>span{
  display: inline-flex;
  align-items: center;
  user-select: none;
  font-size: 16px;
}

.save-session>span::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  /*border: 1px solid #adb5bd;*/
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.save-session>input:not(:disabled):not(:checked)+span:hover::before {
  /*border-color: #4E5477;*/
}
.save-session>input:checked+span::before {
  border-color: transparent;
  background-color: rgba(74, 158, 242, 0.85);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

h4{
  font-size: 1.1em;
  font-weight: normal;
  margin: 0.8rem;
  color: #222222;
}

.files-tape{
  /*box-shadow: rgba(0, 0, 0, 0.35) 0px -8px 12px -8px inset;*/
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
  border-radius: 6px;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  font-size: 0.8em;
  /*height: 220px;*/
  /*width: 200px;*/
  overflow: auto;
  /*overflow-y: hidden;*/
  scrollbar-width: thin;
  z-index: 10;
}
.files-tape > div{
  /*border-radius: 3px;*/
  /*border: 1px solid #0048BA;*/
  font-size: 18px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
}

.document-list{
  display: flex;
  flex-direction: column;
  border: 1px solid;
  height: 100px;
  overflow: auto;
  scrollbar-width: thin;
  z-index: 10;
}
.document-list > div{
  font-size: 18px;
  text-decoration: none;
}
</style>