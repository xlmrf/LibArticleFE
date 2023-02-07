<template>
  <div class="list-item" v-if="document">
    <h5 class="title-document document-item"><router-link :to="'/document/'+document.id" class="link">{{document.title}}</router-link></h5>
    <div><span v-for="item in document.authors">{{item}};</span></div>
    <span>{{document}}</span>
    <span>{{document.year}}</span>
    <span>{{document.place}}</span>
<!--    <div class="authors-document document-item">Authors: <span v-for="author in document.authors">{{author}}</span></div>-->
<!--    <div class="year-document document-item">Year:{{document.year}}</div>-->
<!--    <div class="edition-document document-item">{{document.edition}}</div>-->

    <!-- citation    <span class="citation-view"><router-link :to="'/document/'+document.id" class="link citation-link"><citation :item="document" :style="'apa'"></citation></router-link></span>-->

  </div>

  <h2 v-else class="none_item">None document</h2>
</template>

<script>
import citation from "../additional/CitationStyle"

export default {
  props: ['document'],
  components:{
    citation
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
