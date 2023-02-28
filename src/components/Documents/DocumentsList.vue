<template>
  <div v-if="documents.data">
    <div class="documents-header">
      Знайдено документів {{documents.total}}
    </div>
    <document-item :document="document" v-for="document in documents.data" />
    <pagination :paginate="paginate(documents)"/>
  </div>
</template>

<script>
import pagination from "@/components/Documents/Pagination"
import citation from "../additional/CitationStyle"
import DocumentItem from "@/components/Documents/DocumentItem";
export default {
  props: {
    documents: {
      type:Object
    }
  },

  computed:{

  },
  methods:{
    paginate(item){
      const {data, links, ...paginateObj}=item;
      return paginateObj
    }
  },
  components:{
    DocumentItem,
    citation,
    pagination
  },
  mounted() {
      let i = Object.assign({}, this.documents)
      // i.splice(i.indexOf(i.data), 1);
      console.log('i',i);
  }
}
</script>

<style scoped>
.list-item{
  display: flex;
  flex-direction: column;

  padding: 10px;
  margin: 1rem 5px;
  border-radius: 3px;
  border: 1px solid #212121;
}
.citation-view{
  font-size: 0.8em;
}
.none_item{
  color: rgba(33, 33, 33, 0.62);
}
.citation-link{
  text-decoration: none;
}

</style>
