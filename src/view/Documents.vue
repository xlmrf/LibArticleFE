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
    '$route.fullPath': {
      handler(item) {
        let q = '';
        if (this.$route.fullPath.split('?')[1]) {
          q = '?' + this.$route.fullPath.split('?')[1];
        }
        this.DocumentsMutate({})
        this.DocumentSearcher(q);
      }
    }
  },
  methods: {
    ...mapActions(['DocumentSearcher']),
    ...mapMutations(['DocumentsMutate'])
  },
  computed: {
    ...mapGetters(['getDocuments', 'getTypes'])
  },
  components: {Loader, DocumentsList, FilterOptions},
  mounted() {
    console.log(this.$route)

    let q = '';
    if (this.$route.fullPath.split('?')[1]) {
      q = '?' + this.$route.fullPath.split('?')[1];
    }
    if(this.$route.name==='profile'){
      q+=q?'&user_id='+this.$route.params.id:'?user_id='+this.$route.params.id
    }
    this.DocumentSearcher(q);
    // this.requestTypes()
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