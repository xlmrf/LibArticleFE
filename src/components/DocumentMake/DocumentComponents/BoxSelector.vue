<template>
  <div class="check-item" v-if="this.$route.query.refs_doc_id">
    <label class="checkbox-item filter-checkbox select-type-checkbox">
      <input type="checkbox" v-model="checkItem" @click="checkItemM()">
      <span class="label"></span>
    </label>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  props:['doc'],

  data(){
    return {
      checkItem: false
    }
  },
  watch:{
    '$route.query.refs_doc_id':{
      handler(item){
        if(item && JSON.parse(item).length === 0){
          console.log('refssssss', this.getSelectedRefs)
          this.checkItem = false
        }
      }
    }
  },
  computed:{
    ...mapGetters(['getSelectedRefs'])
  },
  methods:{
    ...mapMutations(['updateSelectedRefs']),
    catchItem(){
      let idx = this.getSelectedRefs.findIndex(item => item.id === this.doc.id)
      if (idx !== -1){
        console.log('bad')
        this.getSelectedRefs.splice(idx, 1)
      }
      else{
        console.log('nice')
        this.getSelectedRefs.push(this.doc)
      }
    },
    checkItemM(){
      let query = Object.assign({}, this.$route.query);
      // this.updateSelectedRefs(query.refs_doc_id !== undefined ? JSON.parse(query.refs_doc_id) : [])

      this.catchItem()

      const refs_idx = this.getSelectedRefs.map(item => item.id);

      this.$router.replace({
        name: 'documents',
        query: {...query, ...{refs_doc_id:JSON.stringify(refs_idx)}}
      })
    },
  }
}
</script>

<style scoped>

</style>