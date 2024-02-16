<template>
  <div class="document-item" :class="{'document-draft': type === 'draft' || this.$route.query.refs_doc_id}" v-if="documentItem.title">
    <div class="context-document-item">
      <box-selector :doc="documentItem" />
      <type-part :article="documentItem" :class="'type-border-color-'+this.$store.getters.getTypesColor[getTypes.find(item => item.id === documentItem?.type_id)?.name]" />
      <date-part :article="documentItem" />
    </div>
    <div class="first-piece">
      <title-part :article="documentItem" :type="type" />
      <authors-part :article="documentItem" :type="type" />
    </div>
    <div class="second-piece">
      <download-part :article="documentItem" :type="type" />
      <views-part :article="documentItem" :type="type" />
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
  display: inherit;
  flex-flow: column;
  margin: 10px 0;
  height: calc(100% - 10px);
}

.second-piece{
  display: inherit;
  align-items: center;
  justify-content: end;
}

.second-piece > div{
  display: flex;
  align-items: center;
}

.second-piece > div:first-child{
  position: absolute;
  right: 110px;
}


/*      old style         */

/*.document-item{*/
/*  position: relative;*/
/*  padding: 0.7rem 1rem;*/
/*  overflow:hidden;*/
/*  outline: none;*/
/*}*/
/*.check-item{*/
/*  position: absolute;*/
/*  left: 0.8rem;*/
/*  top: calc(50% - 9px);*/
/*}*/

/*.context-document-item{*/
/*  display: flex;*/
/*  position: relative;*/
/*  justify-content: space-between;*/
/*  height: calc(100% - 49px);*/
/*  align-items: center;*/
/*}*/

/*.second-piece{*/
/*  padding: 0 5px;*/
/*  display: inherit;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*  flex-flow: column;*/
/*}*/

/*.second-piece > svg{*/
/*  width: 50px;*/
/*  height: 50px;*/
/*}*/

/*.document-list-keywords{*/
/*  !*border: 1px solid black;*!*/
/*  display: flex;*/
/*  flex-flow: row wrap;*/
/*  padding: 5px 0;*/
/*}*/
/*.document-list-keywords > span{*/
/*  background: rgba(125, 215, 207, 0.38);*/
/*  color: #212121;*/
/*  !*background: rgba(32, 178, 170, 0.15);*!*/
/*  !*border-radius: 50px;*!*/
/*  border-radius: 3px;*/
/*  padding: 8px 16px;*/
/*  margin: 5px 10px 5px 0;*/
/*}*/

/*.authors{*/
/*  margin-top: auto;*/
/*}*/

/*.list-document-type{*/
/*  display: flex;*/
/*  font-size: 1.1em;*/
/*}*/

/*.publication-date{*/
/*  color: #535353;*/
/*  margin-left: auto;*/
/*  font-size: 1em;*/
/*}*/

/*.list-document-type > span{*/
/*  border: 1px solid #55B8CA;*/
/*  padding: 2px 8px;*/
/*  border-radius: 3px;*/
/*  text-align: center;*/
/*  !*width: auto;*!*/
/*  color: #55B8CA;*/
/*}*/
/*.draft-type-style > span{*/

/*  padding: 0;*/
/*  border: 1px solid transparent;*/
/*}*/

/*.document-item a:visited{*/
/*  color: #3684DD;*/
/*}*/
/*.document-item a{*/
/*  text-decoration: none;*/
/*  !*color: #0F0F0F;*!*/
/*  color: #0969DA;*/
/*}*/

/*.file-download-link{*/
/*  display: flex;*/
/*}*/

/*.file-download-link > svg{*/
/*  margin-left: 5px;*/
/*}*/

/*.document-draft{*/
/*  background: white;*/
/*  padding: 0.1rem 0.5rem 0.1rem 3rem;*/
/*  margin-bottom: 5px;*/
/*  border-radius: 4px;*/
/*}*/

/*.profile-file-download-link{*/
/*  display: flex;*/
/*  !*position: absolute;*!*/
/*  bottom: 12px;*/
/*  right: 110px;*/
/*}*/

</style>
