<template>
  <div class="documents-wrapper" v-if="getDocuments && getTypes">
    <filter-options/>
    <documents-list :documents="getDocuments"/>
  </div>
</template>

<script>
import FilterOptions from "@/components/Documents/FilterOptions"
import {mapActions, mapGetters} from "vuex";
import DocumentsList from "@/components/Documents/DocumentsList";

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
        this.DocumentSearcher(q);
      }
    }
  },
  methods: {
    ...mapActions(['DocumentSearcher', 'requestTypes'])
  },
  computed: {
    ...mapGetters(['getDocuments', 'getTypes'])
  },
  components: {DocumentsList, FilterOptions},
  mounted() {
    console.log(this.$route.fullPath)
    let q = '';
    if (this.$route.fullPath.split('?')[1]) {
      q = '?' + this.$route.fullPath.split('?')[1];
    }
    this.DocumentSearcher(q);
    this.requestTypes()
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
  flex: 4;
}

</style>