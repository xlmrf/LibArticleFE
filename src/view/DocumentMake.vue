<template>
  <div class="document-make-body">
    <small v-if="getDocument.type_id">{{ getDocument }}</small>
    <h3 align="center">Створити новий документ</h3>
    <first-stage v-if="stage" @next="next"/>
    <second-stage v-else/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import FirstStage from "@/components/DocumentMake/FirstStageDocument";
import SecondStage from "@/components/DocumentMake/SecondStageDocument";

export default {
  data() {
    return {
      stage: true
    }
  },
  methods: {
    ...mapActions(['createDocument', 'getDocumentById']),
    next() {
      this.stage = !this.stage
      if (this.$route.params.id === '') {
        this.createDocument(this.getDocument)
      }
    }
  },
  computed: {
    ...mapGetters(['getDocument'])
  },
  mounted() {

    if (this.$route.params.id !== '') {
      this.getDocumentById(this.$route.params.id);
    }

  },
  name: "DocumentMake",
  components: {SecondStage, FirstStage}
}
</script>

<style scoped>

.document-make-body{
  height: 100%;
  border:1px solid #0d2839;
}
</style>