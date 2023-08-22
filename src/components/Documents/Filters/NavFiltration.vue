<template>
  <div class="used-filters" v-if="JSON.stringify(checkFilter) !== '{}'">
    <div class="top-filter-panel">
      <span>{{ $store.getters.getLanguage.documents.nav_filter.applied_filters}}:</span><span class="clear-filter-btn" @click="clearFilter()">{{ $store.getters.getLanguage.documents.nav_filter.clear}}</span>
    </div>
    <div class="filter-panel" v-for="(item,k) in checkFilter">
      <p class="filter-panel-name">{{ translateFilters(k) }}</p>
      <span v-for="(el, i) in textFilter(item, k)">
      {{ el }}
          <small @click="deleteFilter(k,i)" class="delete-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </small>
      </span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  mixins:['translate'],
  data() {
    return {
      filter_keys:['authors','type_id','publication_date'],
      filter: {}
    }
  },
  computed: {
    ...mapGetters(['getTypes']),
    checkFilter(){
      this.filter = Object.assign({},this.$route.query)
      for (let item in this.filter){
        if (!this.filter_keys.includes(item)){
          delete this.filter[item]
        }
      }
      return this.filter
    },
  },
  methods: {
    checkQuery() {
      let {...query} = this.$route.query;
    },
    textFilter(item, k) {
      let arr = []
      // let text = this.associateFiltersName[k] + ':';
      console.log('item', item, 'k', k)
      if (k === 'type_id') {
        item.split(',').map(i => {
          arr.push(this.getTypes.find(e => e.id === parseInt(i))?.name);
        });
      }
      if (k === 'publication_date') {
        let from = item.split('_')[0];
        let to = item.split('_')[1];
        if (from === to)
          arr.push(`${from}р.`)
        else
          arr.push(`від ${from}р. до ${to}р.`)
      }
      if (k === 'authors') {
        JSON.parse(item).map(i => {
          arr.push((i.last_name ? i.last_name + ' ' : '') + '' + (i.first_name ? i.first_name : ''))
        });
        // arr=JSON.parse(item);
        // console.log(Array.from(item))
        // return this.getTypes.find(ite => ite.id == item).name
      }
      return arr
    },
    deleteFilter(q, i) {
      const {...query} = this.$route.query;
      if (q === 'authors') {
        query[q] = JSON.parse(query[q]);
        query[q].splice(i, 1)
        if (!query[q].length) {
          delete query[q];
        } else {
          query[q] = JSON.stringify(query[q])
        }
      } else if (q === 'type_id') {
        query[q] = query[q].split(',')
        query[q].splice(i, 1)
        if (!query[q].length) {
          delete query[q];
        } else {
          query[q] = query[q].join(',')
        }
      } else {
        delete query[q];
      }

      this.$router.replace({
        name: 'documents',
        query: {...query}
      })
    },
    clearFilter(){
      const id = this.$route.query.from
      this.$router.replace({
        name: 'documents',
        query: {...{from:id}, ...{refs_doc_id:this.$route.query.refs_doc_id}}
      })
    }
  },

  mounted() {

  }

}
</script>

<style scoped>

.top-filter-panel{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
}
.top-filter-panel > span{
  /*flex: 1;*/

}

.used-filters {
  margin-top: 1rem;
  /*display: flex;*/
  position: relative;
}


.filter-panel{
  display: flex;
  align-items: center;
  list-style: none;
  flex-wrap: wrap;
  /*border: 1px solid #BBBBBB;*/
  margin: 5px 0;
  border-radius: 4px;
  padding-top: 0.2rem;
  color: #363232;
}

.filter-panel > span {
  display: flex;
  cursor: default;
  width: fit-content;
  /*font-size: 1em;*/
  /*margin: 0 0.1rem;*/
  color: #048e9e;
  padding: 4px 6px;
  border-radius: 40px;
  /*background: rgba(16, 89, 255, 0.25);*/
  /*background: rgba(119, 169, 222, 0.59);*/
}

.delete-item {
  position: relative;
  top: 2px;
  margin-left: 0.1rem;
  cursor: pointer;
  align-self: center;
  height: 18px;
}

.delete-item > svg:hover {
  stroke: #222222;
}

.clear-filter-btn{
  /*position: absolute;*/
  /*top: calc(50% - 20px);*/
  margin-right: 20px;
  border: 1px solid #bbbbbb;
  color: #535353;
  cursor: pointer;
  border-radius: 4px;
  padding: 5px 10px;
}

.clear-filter-btn:hover{
  border: 1px solid #535353;
  color: #333333;
}

.filter-panel-name{
  font-size: 20px;
  display: flex;
  align-self: start;
  position: relative;
  top: -1px;
}


</style>