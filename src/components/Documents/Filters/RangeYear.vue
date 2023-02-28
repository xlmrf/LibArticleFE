<template>
  <div>
    <span class="filter-title" @click="YearsFilterOpen = !YearsFilterOpen">
      Years <tumbler-filter-button :toggle="YearsFilterOpen"/>

    </span>
    <div :class="['filter-area years-panel',{filter_open:YearsFilterOpen}]" v-if="getYears">
      <span>
        <label for="min-year">min year</label>
        <input type="text" name="min-year" id="min-year" v-model="getYears.from_year" @keyup="key()">
      </span>
      <span>
        <label for="max-year">max year</label>
        <input type="text" name="max-year" id="max-year" v-model="getYears.to_year" @keyup="key()">
      </span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TumblerFilterButton from "@/components/additional/TumblerFilterButton";

export default {
  components: {TumblerFilterButton},
  data(){
    return{
      YearsFilterOpen: false,
      min_year:0,
      max_year:0
    }
  },
  methods:{
    ...mapActions(['YearsFilter']),
    key(){
      if(this.getYears.from_year !== null && this.getYears.from_year.length === 4&&this.getYears.to_year !== null && this.getYears.to_year.length === 4){
        this.findDocumentsOfYears
      }
    }
  },
  watch:{

    '$route.query.q': {
      handler() {
        this.findYears;
      }
    },
    '$route.query.type_id': {
      handler() {
        this.findYears;
      }
    },
    "$route.query.authors": {
      handler(key) {
        this.findYears;
        console.log('query change', key)

      }
    }
  },
  computed:{
    ...mapGetters(['getYears']),
    findDocumentsOfYears(){
      let query = Object.assign({}, this.$route.query);
      delete query.page;
      this.$router.push({
        name: 'documents',
        query: {...query, ...{publication_date:this.getYears.from_year+'_'+this.getYears.to_year}}
      })
    },


    findYears() {
      let q = '';
      if (this.$route.fullPath.split("?")[1] !== undefined)
        q = this.$route.fullPath.split("?")[1]
      let link = '?'+ (q ?q: '');
      this.YearsFilter(link)
    }


    },
  mounted() {
   this.findYears
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