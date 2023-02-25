<template>
  <div class="document-make-body">
<!--    <small v-if="getDocument.type_id">{{ getDocument }}</small>-->
    <first-stage v-if="prev_stage" @next="next"/>
    <second-stage @prev="prev" v-else/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import FirstStage from "@/components/DocumentMake/FirstStageDocument";
import SecondStage from "@/components/DocumentMake/SecondStageDocument";

export default {
  data() {
    return {
      prev_stage: true
    }
  },
  methods: {
    ...mapActions(['createDocument', 'getDocumentById']),
    next() {
      this.prev_stage = !this.prev_stage
      if (!this.$route.params.id) {
        this.createDocument(this.getDocument)
      }
    },
    prev(){
      this.prev_stage = true
    }
  },
  computed: {
    ...mapGetters(['getDocument'])
  },
  watch:{
    '$route.params': {
        handler(item){
          // if (!(item.id && this.stage === true)){
          //     this.stage = true
          // }
          // else {
          //   this.stage = false
          // }

          if(!item.id){
            this.prev_stage=true
          }
          else {
            this.prev_stage=false
          }
        }
    },
  },
  mounted() {
    if (this.$route.params.id !== '') {
      this.getDocumentById(this.$route.params.id);
      this.prev_stage = false
    }
  },
  updated() {
    // if (this.$route.params.id !== ''&&!this.getDocument.id) {
    //   console.log('beforeUpdate');
    //   this.getDocumentById(this.$route.params.id);
    //   this.prev_stage = false
    // }
  },

  name: "DocumentMake",
  components: {SecondStage, FirstStage}
}
</script>

<style scoped>

.document-make-body{
  height: 100%;
  /*border:1px solid #0d2839;*/
}
</style>