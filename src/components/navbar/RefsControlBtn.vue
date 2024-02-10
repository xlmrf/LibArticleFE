<template>
    <span class="btn-in-search" @click="addRefs" v-if="JSON.parse($route.query.refs_doc_id).length > 0">
        {{this.$store.getters.getLanguage.navbar.add_refs_btn }} {{JSON.parse($route.query.refs_doc_id).length}}</span>
    <span class="btn-in-search" @click="backToDoc" v-else>
        {{this.$store.getters.getLanguage.navbar.back_to_doc_btn }}</span>
</template>

<script>
import {apa} from "@/styleLib";
import {mapGetters} from "vuex";

export default {

  computed:{
    ...mapGetters(['getMakeDocument','getSelectedRefs']),
    addRefs(){

      let q = Object.assign({}, this.$route.query)
      const id = this.$route.query.from

      for (let item in this.getSelectedRefs){
        if (this.getMakeDocument.references.find(ref => ref.reference_document_id === this.getSelectedRefs[item].id) === undefined) {
          this.getMakeDocument.references.push({
            reference_document_id: this.getSelectedRefs[item].id,
            bibliographic_description: apa(this.getSelectedRefs[item])
            // this.getSelectedRefs[item].title
          })
        }
        else{
          // alert that the document has an reference(s)
        }
      }

      // this.$router.replace({
      //   name: 'documents',
      //   query: {...q, ...{confirm_refs:true}}
      // })

      this.$router.push('/document/make/'+this.$route.query.from)


    },
    backToDoc(){

      let q = Object.assign({}, this.$route.query)
      const id = this.$route.query.from

      for (let item in this.getSelectedRefs){
        if (this.getMakeDocument.references.find(ref => ref.reference_document_id === this.getSelectedRefs[item].id) === undefined) {
          this.getMakeDocument.references.push({
            reference_document_id: this.getSelectedRefs[item].id,
            bibliographic_description: apa(this.getSelectedRefs[item])
            // this.getSelectedRefs[item].title
          })
        }
        else{
          // alert that the document has an reference(s)
        }
      }

      this.$router.push('/document/make/'+this.$route.query.from)
    }
  }

}
</script>

<style scoped>

</style>