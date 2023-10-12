<template>
  <div class="document-topics" v-if="data[0]">
    <p class="chapter-header">{{$store.getters.getLanguage.profile.headers.popular_publication}}</p>
    <div class="document-topics-block">
      <profile-document-item class="s-document" v-for="item in data.slice(0,2) " :documentItem="item" type="profile"/>
<!--       <router-link :to="'/document/'+item.id">{{item.title}} </router-link> - {{item.views}}-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DocumentItem from "@/components/Documents/DocumentItem";
import {mapGetters} from "vuex";
import ProfileDocumentItem from "@/components/profile/Info/ProfileDocumentItem";

export default {
  components: {ProfileDocumentItem, DocumentItem},
  data() {
    return {
      data: []
    }
  },
  watch: {
    '$route': {
      handler(item) {
        if (item.name === 'profile' && item.params.id) {
          this.data = []
          this.getTopics()
        }
      },
      deep:true
    },
  },
  methods: {
    getTopics() {
      axios.get('https://libarticle.polidar.in.ua/api/v1/report/documents-top/profile/' + this.$route.params.id).then(response => {
        this.data = response.data;
      }, err => {
        console.log('error info -', err.message);
        // ctx.commit('setInfo', err)
      })
    }
  },
  computed:{
    ...mapGetters(['getUser'])
  },
  mounted() {
    this.getTopics();
  }
}
</script>

<style scoped>
p{

}
.document-topics{
  padding: 10px 0;
}

.s-document{
  font-size: 0.8em;
  border: 1px solid #BFBFBFD8;
  color: #9A9A9A;
  border-radius: 5px;
  margin: 5px;
  width: 48%;
  flex: auto;
}
.document-topics-block{
  display: flex;
  flex-flow: row wrap;
}
</style>