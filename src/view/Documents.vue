<template>
  <div class="documents-wrapper" v-if="getDocuments && getTypes">
    <filter-options class="filters-side" />
    <documents-list :documents="getDocuments" v-if="Object.keys(getDocuments).length > 0"/>
    <loader :loader_class="['mid-top']" width="4" radius="20" v-else/>
  </div>
</template>

<script>
import FilterOptions from "@/components/Documents/FilterOptions"
import {mapActions, mapGetters, mapMutations} from "vuex";
import DocumentsList from "@/components/Documents/DocumentsList";
import Loader from "@/components/additional/loader";

export default {
  data() {
    return {
      query: ''
    }
  },
  name: "Documents",
  watch: {
    '$route': {
      handler(route) {
        if (route.name === 'documents') {
          if (route.query.refs_doc_id && !route.query.from) {
            this.$router.push('/documents')
          }

          let search = localStorage.getItem('search')
          let arr = []
          let filteredArr = []
          arr.push(route.fullPath.split('?'))
          search ? arr.push(search.split('?')) : ''
          for (let item in arr) {

            if (arr[item].length > 1) {
              const query = arr[item][1]
              const params = query.split('&')
              const filteredParams = params.filter(param => !param.startsWith('refs_doc_id='))
              const outputText = `${arr[item][0]}?${filteredParams.join('&')}`
              filteredArr.push(outputText)
            }
          }

          if (!((route.query.refs_doc_id && Object.keys(route.query).length < 3) || (filteredArr[1] && filteredArr[0] === filteredArr[1]))) {
            let q = '';
            if (route.fullPath.split('?')[1]) {
              q = '?' + route.fullPath.split('?')[1];
            }
            this.DocumentsMutate({})
            this.DocumentSearcher(q);
          }

          localStorage.setItem('search', route.fullPath)
        }
      },
      deep:true
    }
  },
  methods: {
    ...mapActions(['DocumentSearcher']),
    ...mapMutations(['DocumentsMutate','updateSelectedRefs'])
  },
  computed: {
    ...mapGetters(['getDocuments', 'getTypes', 'getSelectedRefs'])
  },
  components: {Loader, DocumentsList, FilterOptions},
  mounted() {

    let q = '';
    if (this.$route.fullPath.split('?')[1]) {
      q = '?' + this.$route.fullPath.split('?')[1];
    }
    if(this.$route.name==='profile'){
      q+=q?'&user_id='+this.$route.params.id:'?user_id='+this.$route.params.id
    }
    this.DocumentSearcher(q);
    // this.requestTypes()
  },


  beforeUnmount() {
    this.DocumentsMutate({})
    this.updateSelectedRefs([])
    localStorage.removeItem('search')
  }
}
</script>

<style scoped>

.documents-wrapper {
  display: flex;
}

.documents-wrapper > :first-child {
  flex: 1;
}

.documents-wrapper > :last-child {
  flex: 5;
  margin-right: 5px;
}

</style>