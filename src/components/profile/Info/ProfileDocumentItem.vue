<template>
  <div class="document-item" :class="['type-border-color-'+ $store.getters.getTypesColor[getTypes.find(item => item.id === documentItem.type_id)?.name],{'document-draft': type === 'draft' || this.$route.query.refs_doc_id}]" v-if="documentItem.title">
    <div class="context-document-item">
      <type-part :article="documentItem" :type="type" />
      <date-part :article="documentItem" />
    </div>
    <div class="first-piece">
      <title-part :article="documentItem" :type="type" />
    </div>
    <div class="second-piece">
      <authors-part :article="documentItem" :type="type" />
    </div>
    <div class="third-piece">

<!--      <span @click="copy('')" class="ref-copy-area">-->
<!--        <span>{{ this.$store.getters.getLanguage.document.characteristic.copy }}</span>-->
<!--&lt;!&ndash;        <svg xmlns="http://www.w3.org/2000/svg" v-if="copy_idx === idx" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>&ndash;&gt;-->
<!--      </span>-->

<!--      <download-part :article="documentItem" :type="type" />-->
      <views-part :article="documentItem" :type="type" />
    </div>
  </div>
</template>

<script>
import viewsDocument from "@/components/document/viewsDocument";

import {mapGetters, mapState} from "vuex";

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
      type: 'profile',
      // copy_idx:-1,
    }
  },

  methods:{
    async copy(text){
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    },
  },

  computed:{
    ...mapGetters(['getTypes','getMakeDocument','getSelectedRefs']),
    ...mapState(['api_url_v1'])
  },
  beforeMount() {
    // if (this.$route.query.refs_doc_id){
    //   this.type = 'draft'
    // }
  },
  mounted() {
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


  components:{ViewsPart, AuthorsPart, DatePart, TypePart, TitlePart, DownloadPart, viewsDocument}
}
</script>

<style lang="scss" scoped>
@import '../../../TypeColor.scss';

.third-piece{
  padding-top: 5px;
  //margin-top: auto;
  display: flex;
  justify-content: right;
  //position: absolute;
  //right: 1rem;
  //bottom: 0.7rem;
}
.third-piece > div{
  //margin-left: 1rem;
}
.second-piece{
  margin-top: auto;
}
.second-piece > div{
  display: flex;
}

/*.document-item{*/
/*  position: relative;*/
/*  padding: 1rem;*/
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
/*}*/

/*.first-piece{*/
/*  display: inherit;*/
/*  flex-flow: column;*/
/*  margin: 10px 0;*/
/*  height: calc(100% - 10px);*/
/*}*/

/*.second-piece{*/
/*  padding: 0 5px;*/
/*  display: inherit;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*  flex-flow: column;*/
/*}*/




/*.draft-type-style > span{*/

/*  padding: 0;*/
/*  border: 1px solid transparent;*/
/*}*/

/*.document-draft{*/
/*  background: white;*/
/*  padding: 0.1rem 0.5rem 0.1rem 3rem;*/
/*  margin-bottom: 5px;*/
/*  border-radius: 4px;*/
/*}*/

/*.third-piece{*/
/*  border: 1px solid black;*/
/*}*/

</style>