<template>
  <div class="used-filters">
<!--        Застосовані фільтри:-->
<!--    {{checkQuery()}}-->
    <span v-for="(item,k) in $route.query">
      {{associateFiltersName[k]}};
      <span v-for="el in textFilter(item, k)">
      {{el}}
          <small @click="deleteFilter(k)" class="delete-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </small>
      </span>
    </span>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      associateFiltersName: {
        my: 'Мої документи',
        authors: 'Автори',
        type_id: 'Тип',
        publication_date: 'Дата публікації'
      }
    }
  },
  computed:{
    ...mapGetters(['getTypes']),
  },
  methods:{
    checkQuery() {
      let {...query} = this.$route.query;
    },

    textFilter(item, k) {
      let arr = []
      // let text = this.associateFiltersName[k] + ':';
      console.log('item', item,'k',k)
      if (k === 'type_id') {
        item.split(',').map(i => {
          arr.push(i)
          console.log('item', item)
          // return this.getTypes.find(ite => ite.id == item).name
        })
      }
      if (k === 'publication_date') {
        item.split('_').map(i => {
          arr.push(i)
          // return this.getTypes.find(ite => ite.id == item).name
        });
      }
      if (k === 'authors') {
        JSON.parse(item).map(i => {
          arr.push(i.last_name+' '+i.first_name)
          // return this.getTypes.find(ite => ite.id == item).name
        });
        // arr=JSON.parse(item);
          // console.log(Array.from(item))
          // return this.getTypes.find(ite => ite.id == item).name
      }
      return arr
    },
    deleteFilter(q) {
      const {...query} = this.$route.query;
      delete query[q];

      this.$router.replace({
        name: 'documents',
        query: {...query}
      })
    }
  }

}
</script>

<style scoped>

.used-filters {
  margin-top: 1rem;
  display: flex;
}

.used-filters span >span {
  display: flex;
  cursor: default;
  width: fit-content;
  /*font-size: 1em;*/
  margin: 0 0.2rem;
  padding: 4px 12px;
  border-radius: 40px;
  background: rgba(16, 89, 255, 0.25);
}

.delete-item {
  margin-left: 0.1rem;
  cursor: pointer;
  align-self: end;
  height: 18px;
}

.delete-item > svg:hover {
  stroke: #222222;
}
</style>