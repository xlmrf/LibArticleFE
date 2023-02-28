<template>
  <div v-if="getTypes">
    <span class="filter-title authors-title-filter" @click="TypesFilterOpen = !TypesFilterOpen">
      Types <tumbler-filter-button :toggle="TypesFilterOpen"/>
    </span>
    <div :class="['filter-area',{filter_open:TypesFilterOpen}]">
      <label class="save-session" v-for="(id,idx) in getFilterTypes">
        <input type="checkbox" :value="id" v-model="chosen" id="test" @change="pushTypes">
        <span class="label">{{ getTypes.find(item => item.id === id).name }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import TumblerFilterButton from "@/components/additional/TumblerFilterButton";
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      TypesFilterOpen: false,
      chosen: [],

    }
  },

  methods: {
    ...mapActions(['TypesFilter']),

    findTypes() {
      if (this.$route.query.type_id) {
        this.chosen = this.$route.query.type_id.split(',')
      }
      let q = '';
      if (this.$route.fullPath.split("?")[1] !== undefined)
        q = this.$route.fullPath.split("?")[1]
      let link = '?' + (q ? q : '');
      this.TypesFilter(link)
    },
    checkAuthors() {

      // for (let author in this.$route.query){
      //   console.log('query route',this.$route.query[author])
      // }
    }
  },
  watch: {
    chosen() {
      // this.TypesFilter(this.chosen)
    },
    '$route.query.q': {
      handler() {
        this.findTypes();
      }
    },
    '$route.query.publication_date': {
      handler() {
        this.findTypes();
      }
    },
    "$route.query.authors": {
      handler(key) {
        this.findTypes();
        console.log('query change', key)

      }
    }
  },
  computed: {
    ...mapGetters(['getTypes', 'getFilterTypes']),
    pushTypes() {

      let type_id = {};
      if (this.chosen.join(',') !== '') {
        type_id = {type_id: this.chosen.join(',')}
      }


      let query = Object.assign({}, this.$route.query);
      delete query.page;
      delete query.type_id;


      // let q = Object.entries(query).join('&').split(',').join('=')
      // let link = '?'+ (q ?q+'&': '')+(items ? 'type_id='+items : '');
      // this.$router.push('/documents'+link)

      this.$router.replace({
        name: 'documents',
        query: {...query, ...type_id}
      })
      // console.log('link:',r_link)
    }
  },
  mounted() {
    this.findTypes();
    this.checkAuthors()
  },
  components: {TumblerFilterButton}
}
</script>

<style scoped>

</style>