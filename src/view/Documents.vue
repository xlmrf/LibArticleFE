<template>
  <div class="documents-wrapper" v-if="getDocuments">
    <filter-options />
    <documents-list :documents="getDocuments"/>
  </div>
</template>

<script>
import FilterOptions from "@/components/Documents/FilterOptions"
import {mapActions, mapGetters} from "vuex";
import DocumentsList from "@/components/Documents/DocumentsList";

export default {
  data(){
    return{
      query:''
    }
  },
  name: "Documents",
  watch:{
    '$route.fullPath': {
      handler(item){
        // if (!(item.id && this.stage === true)){
        //     this.stage = true
        // }
        // else {
        //   this.stage = false
        // }
        // this.query='?'+item.split('?')[1];


        // let link = '?'+Object.entries(this.query).join('&').split(',').join('=');
        this.DocumentSearcher(item);

        console.log('watch query:',this.query)
        }
      }
  },
  methods: {
    ...mapActions(['DocumentSearcher'])
  },
  computed: {
    ...mapGetters(['getDocuments'])
  },
  components:{DocumentsList, FilterOptions},
  mounted() {
    // let link = '?'+Object.entries(this.query).join('&').split(',').join('=');
    // let query='?'+this.query.split('?')[1];
    console.log(this.$route.fullPath)
    this.DocumentSearcher(this.$route.fullPath);
  }
}
</script>

<style scoped>

.documents-wrapper{
  display: flex;
}
.documents-wrapper >:first-child{
  flex: 1;
}
.documents-wrapper >:last-child{
  flex: 4;
}

</style>