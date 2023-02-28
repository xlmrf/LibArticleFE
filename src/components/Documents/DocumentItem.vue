<template>
  <div class="document-item">
    <h3>
      <router-link :to="'/document/'+document.id">
        {{document.title}}
      </router-link>
    </h3>
    <div>
      <span>
        {{getTypes.find(item => item.id === document.type_id).name}}
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
  border: 1px solid red;
}
</style>