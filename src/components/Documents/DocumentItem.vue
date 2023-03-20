<template>
  <div class="document-item">
    <div class="first-piece">
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
      <div class="authors">
      <span class="author-item" v-for="author in document.authors">
        <router-link class="author-item-link" :to="'/profile/'+author.user_id" v-if="author.user_id">
          {{author.last_name}} {{author.first_name?author.first_name[0]:''}}
        </router-link>
        <span v-else>
          {{author.last_name}} {{author.first_name?author.first_name[0]:''}}.
        </span>
      </span>
      </div>
      <span>
      <span v-for="keyword in document.keywords">
        {{keyword}};
      </span>
    </span>
      <span>seen: {{document.views}}</span>
      {{document.publication_date}}
    </div>
    <div class="second-piece">
      eawegawe
    </div>
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
  position: relative;
  /*cursor: pointer;*/
  /*margin: 0 5%;*/
  padding: 10px;
  overflow:hidden;
  outline: none;
  justify-content: space-between;
}
.first-piece{
  display: inherit;
  flex-flow: column;
}
.second-piece{
  border: 1px solid ;
}

h3{

}
.document-item a:visited{
  color: #3684DD;
}
.document-item a{
  text-decoration: none;
  /*color: #0F0F0F;*/
  color: #0969DA;
}
.author-item-link{
  color: #0969DA;
}
.author-item-link:hover{
  text-decoration: underline #3684DD;
}
.author-item{
  position: relative;
  padding: 10px;
}
.author-item:after{
  content: "";
  position: absolute;
  background: #9A9A9A;
  width: 1px;
  top: 25%;
  right: 0;
  height: 50%;
}
.author-item:last-child:after{
  content: "";
  background: transparent;
}
.authors{
  margin: 10px 0;
}

</style>