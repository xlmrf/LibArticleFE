<template>
  <div class="document-make-body">

<!--        <small v-if="getDocument.type_id">{{ getDocument }}</small>-->
<!--    <p class="code">{{getDocument}}</p>-->
    <first-stage v-if="prev_stage" @next="next"/>
    <second-stage @prev="prev" v-else/>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex"
import FirstStage from "@/components/DocumentMake/PrevMakeDocument";
import SecondStage from "@/components/DocumentMake/EditDocument";
import {computed, ref, provide, watch} from "vue";

export default {


  data() {
    return{
      prev_stage: true
    }
  },

  // setup(){
  //
  //   let titleError = ref(false)
  //   let text = ref('')
  //   const { getDocument } = mapGetters(['getDocument']);
  //
  //   provide('titleFieldError', titleError.value)
  //
  //   watch(() => text, (newTitle) => {
  //
  //   }, {deep: true});
  //
  //   console.log(getDocument);
  //
  //   return {
  //     titleError,
  //     text,
  //     getDocument
  //   }
  //
  // },

  methods: {
    ...mapMutations(['DocumentMutate']),
    ...mapActions(['createDocument', 'requestDocument']),
    next() {
        this.prev_stage = !this.prev_stage
        if (!this.$route.params.id) {
          this.createDocument(this.getDocument)
        }
    },
    prev() {
      this.prev_stage = true
    }
  },
  computed: {
    ...mapGetters(['getDocument', 'getTypes'])
  },
  watch: {
    '$route.params': {
      handler(item) {
        this.prev_stage = !item.id;
      }
    },
    'getDocument':{
      handler(){
        this.titleError = false
      },
      deep:true
    }
  },
  mounted() {
    this.DocumentMutate({})
    if (this.$route.params.id !== '') {
      this.requestDocument(this.$route.params.id);
      this.prev_stage = false
    }
  },
  updated() {
    if (this.$route.params.id !== ''&&!this.getDocument.id) {
      console.log('beforeUpdate');
      // this.getDocumentById(this.$route.params.id);
      this.prev_stage = false
    }
  },

  name: "DocumentMake",
  components: {SecondStage, FirstStage}
}
</script>

<style scoped>
.code{
  border: 1px solid #bbb;
  color: #0e710e;
  border-radius: 2px;
  padding: 5px;
  margin: 5px;
}

.document-make-body {
  height: 100%;
  /*background: #FCFCFC;*/
  /*border:1px solid #0d2839;*/
}

.document-make-body > div{
  position: relative;
}
</style>