<template>
  <div>
    <span class="filter-title" @click="YearsFilterOpen = !YearsFilterOpen">Years</span>
    <div :class="['filter-area years-panel',{filter_open:YearsFilterOpen}]">
      <span>
        <label for="min-year">min year</label>
        <input type="text" name="min-year" id="min-year" v-model="getYears.from_year">
      </span>
      <span>
        <label for="max-year">max year</label>
        <input type="text" name="max-year" id="max-year" v-model="getYears.to_year">
      </span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data(){
    return{
      YearsFilterOpen: false,
      min_year:0,
      max_year:0
    }
  },
  methods:{
    ...mapActions(['YearsFilter'])
  },
  watch:{
    'getYears.from_year':{
      handler(newVal, oldVal){
        console.log("year",oldVal);
        if(this.getYears.from_year.length === 4 && oldVal!== undefined){
          this.findYears
        }
      }
    },
    'getYears.to_year': {
      handler(newVal, oldVal) {
        if (this.getYears.to_year.length === 4 && oldVal!== undefined) {
          this.findYears
        }
      }
    }
  },
  computed:{
    ...mapGetters(['getYears']),
    findYears(){
      let query = Object.assign({}, this.$route.query);
      delete query.page;
      this.$router.push({
        name: 'documents',
        query: {...query, ...{publication_date:this.getYears.from_year+'_'+this.getYears.to_year}}
      })
    }

  },
  mounted() {
    let q = Object.entries(this.$route.query).join('&').split(',').join('=')
    let link = '?'+ (q ?q+'&': '');
    return this.YearsFilter(link)
  },
  name: "RangeYear"
}
</script>

<style scoped>
.years-panel > span{
  margin: 10px;
}
.years-panel input{
  margin-left: 5px;
  padding: 5px;
}
</style>