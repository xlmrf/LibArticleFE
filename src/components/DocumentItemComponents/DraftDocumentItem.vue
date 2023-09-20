<template>
  <div class="document-item document-draft" v-if="documentItem.title">
    <box-selector :doc="documentItem" class="draft-selector"  />
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
import BoxSelector from "@/components/DocumentItemComponents/parts/BoxSelector";
import DownloadPart from "@/components/DocumentItemComponents/parts/DownloadPart";
import TitlePart from "@/components/DocumentItemComponents/parts/TitlePart";
import TypePart from "@/components/DocumentItemComponents/parts/TypePart";
import DatePart from "@/components/DocumentItemComponents/parts/DatePart";
import AuthorsPart from "@/components/DocumentItemComponents/parts/AuthorsPart";
import ViewsPart from "@/components/DocumentItemComponents/parts/ViewsPart";


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
.draft-selector{
  position: absolute;
  top: 59px;
}

</style>