<template>
  <div class="document-item document-draft" v-if="documentItem.title">
<!--    <box-selector :doc="documentItem"  />  selector for remove items    -->
    <div class="context-document-item">
      <type-part :article="documentItem" :class="'type-border-color-'+this.$store.getters.getTypesColor[getTypes.find(item => item.id === documentItem?.type_id)?.name]" />
      <date-part :article="documentItem" />
    </div>
    <div class="first-piece">
      <title-part :article="documentItem" :type="type" />
      <authors-part v-if="documentItem.authors && documentItem.authors.length > 0" :article="documentItem" :type="type" />
    </div>
  </div>
</template>

<script>
import viewsDocument from "@/components/document/viewsDocument";
import {mapGetters, mapMutations, mapState} from "vuex";
import BoxSelector from "@/components/Documents/DocumentItemComponents/BoxSelector";
import DownloadPart from "@/components/Documents/DocumentItemComponents/DownloadPart";
import TitlePart from "@/components/Documents/DocumentItemComponents/TitlePart";
import TypePart from "@/components/Documents/DocumentItemComponents/TypePart";
import DatePart from "@/components/Documents/DocumentItemComponents/DatePart";
import AuthorsPart from "@/components/Documents/DocumentItemComponents/AuthorsPart";
import ViewsPart from "@/components/Documents/DocumentItemComponents/ViewsPart";


export default {
  props:['documentItem'],

  data(){
    return{
      pointDocument: null,
      type: 'searcher'
    }
  },

  methods:{
    viewsDocument(){
      axios.get(this.api_url_v1 + '/report/document-views/' + this.documentItem.id).then(response => {
        this.views = response.data
      }, err => {
        console.log('views error:',err);
      })
    },

  },

  computed:{
    ...mapGetters(['getTypes','getMakeDocument','getSelectedRefs']),
    ...mapState(['api_url_v1', 'TypesColor'])
  },
  beforeMount() {
    // if (this.$route.query.refs_doc_id){
    //   this.type = 'draft'
    // }
  },
  mounted() {

    if (this.type !== 'draft')
      this.viewsDocument()

    // if (this.$route.query.refs_doc_id){
    //   this.updateSelectedRefs([])
    //   this.checkItem = this.$route.query.refs_doc_id && JSON.parse(this.$route.query.refs_doc_id).find(id => id === this.documentItem.id) !== undefined
    //   this.getSelectedRefs.push(
    //       {
    //         reference_document_id:this.documentItem.id,
    //         bibliographic_description: apa(this.documentItem)
    //       }
    //   )
    // }

  },


  components:{ViewsPart, AuthorsPart, DatePart, TypePart, TitlePart, DownloadPart, BoxSelector, viewsDocument}
}
</script>

<style scoped>

.first-piece{
  margin-left: 30px;
  margin-top: 10px;
}


</style>