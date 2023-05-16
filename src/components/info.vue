<template>
  <h3>Останні додані документи</h3>
<!--  <item-list-document-component v-for="document in getLastDocuments" :document="document"></item-list-document-component>-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ItemListDocumentComponent from "./library/ItemListDocumentComponent";

export default {
  components: {ItemListDocumentComponent},
  methods:{
    ...mapActions(['lastDocuments'])
  },
  computed:{
    ...mapGetters(['getLastDocuments'])
  },
  mounted() {
    // this.lastDocuments()
  }
}
</script>

<style scoped>

</style>