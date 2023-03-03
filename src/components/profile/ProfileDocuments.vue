<template>
  <div>
    <documents-list :documents="getDocuments"/>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DocumentsList from "@/components/Documents/DocumentsList";

export default {
  watch: {
    '$route.fullPath': {
      handler(item) {
        let q = '';
        if (this.$route.fullPath.split('?')[1]) {
          q = '?' + this.$route.fullPath.split('?')[1];
        }
        q+=q?'&user_id='+this.$route.params.id:'?user_id='+this.$route.params.id
        q+='&author=true'

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
  components: {DocumentsList},
  mounted() {
    console.log(this.$route)

    let q = '';
    if (this.$route.fullPath.split('?')[1]) {
      q = '?' + this.$route.fullPath.split('?')[1];
    }
    if(this.$route.name==='profile'){
      q+=q?'&user_id='+this.$route.params.id:'?user_id='+this.$route.params.id
      q+='&author=true'
    }
    this.DocumentSearcher(q);
    this.requestTypes()
  }
}
</script>

<style scoped>

</style>