<template>
    <span class="btn-in-search" @click="addRefs" v-if="this.$route.query.cites_document_id">
        {{this.$store.getters.getLanguage.navbar.back_to_doc_btn }}
    </span>
</template>

<script>
import {apa} from "@/styleLib";
import {mapGetters} from "vuex";

export default {

  computed:{
    ...mapGetters(['getMakeDocument','getSelectedRefs']),
    addRefs(){

      // let q = Object.assign({}, this.$route.query)
      // const id = this.$route.query.from
      //
      // for (let item in this.getSelectedRefs){
      //   if (this.getMakeDocument.references.find(ref => ref.reference_document_id === this.getSelectedRefs[item].id) === undefined) {
      //     this.getMakeDocument.references.push({
      //       reference_document_id: this.getSelectedRefs[item].id,
      //       bibliographic_description: apa(this.getSelectedRefs[item])
      //       // this.getSelectedRefs[item].title
      //     })
      //   }
      //   else{
      //     // alert that the document has an reference(s)
      //   }
      // }

      // this.$router.replace({
      //   name: 'documents',
      //   query: {...q, ...{confirm_refs:true}}
      // })

      this.$router.push('/document/make/'+this.$route.query.cites_document_id)


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
