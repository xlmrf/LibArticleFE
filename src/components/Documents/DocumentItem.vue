<template>
  <div class="document-item">
    <h3>
      <router-link :to="'/document/'+document.id">
        {{document.title}}
      </router-link>
    </h3>
    <div>
      <span>
        {{getTypes.find(item => item.id === document.type_id)?.name}}
      </span>
    </div>
    <div>
      <span v-for="author in document.authors">
        {{author.last_name}} {{author.first_name?author.first_name[0]:''}}.
      </span>
    </div>
    <span>
      <span v-for="keyword in document.keywords">
        {{keyword}};
      </span>
    </span>
    {{document.publication_date}}
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props:['document'],
  computed:{
    ...mapGetters(['getTypes'])
  }
}
</script>

<style scoped>

.document-item{
  display: flex;
  flex-flow: column;
  align-self: center;
  position: relative;
  /*cursor: pointer;*/
  /*margin: 0 5%;*/
  padding: 20px;
  overflow:hidden;
  outline: none;
}
.document-item:after{
  content:'';
  position:absolute;
  width:100%;
  height:0.05rem;
  left:0;
  bottom:3px;
  background: #bfbfbf;
}
.document-item a:visited{
  color: #222222;
}
.document-item a{
  text-decoration: none;
  color: #0F0F0F;
}
</style>