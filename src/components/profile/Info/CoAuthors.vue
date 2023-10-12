<template>
  <div class="co-authors-panel" v-if="data.coauthors && data.coauthors.value > 0">
    <p class="chapter-header">{{ $store.getters.getLanguage.profile.headers.popular_coauthors }}
<!--      <span v-if="data.coauthors">{{data.coauthors.value}}</span>-->
    </p>
    <div class="co-authors-block" >
      <div v-if="data.coauthor_top" v-for="item in data.coauthor_top.value">
  <!--        <router-link :to="'/profile/'+item.user_id">{{item.last_name}} </router-link> - {{item.count}}-->

        <div class="avatar">
          <img :src="getAnonPhoto" class="user-avatar popular-coauthor-avatar" alt="user photo">
        </div>
        <router-link v-if="item.user_id" class="co-author profile-link" :to="'/profile/'+item.user_id">
          <span>{{item.last_name}}</span>
          <span>{{item.first_name}}</span>
          <span v-if="item.middle_name !== null">{{item.middle_name}}</span>
        </router-link>

        <span v-else class="co-author">
          <span>{{item.last_name}}</span>
          <span>{{item.first_name}}</span>
          <span v-if="item.middle_name !== null">{{item.middle_name}}</span>
        </span>
      </div>
      <div v-else>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      data: []
    }
  },
  watch: {
    '$route': {
      handler(item) {
        if (item.name === 'profile' && item.params.id) {
          this.getAuthors();
        }
      },
      deep:true
    },
  },
  methods: {
    getAuthors() {
      axios.get('https://libarticle.polidar.in.ua/api/v1/report/co-author-top/profile/' + this.$route.params.id).then(response => {
        this.data = response.data;
      }, err => {
        console.log('error info -', err.message);
      })
    }
  },
  computed:{
    ...mapGetters(['getAnonPhoto'])
  },
  mounted() {
    this.getAuthors();
  }
}
</script>

<style scoped>


.co-author{
  text-decoration: none;
  /*padding: 5px 10px;*/
  /*margin-right: 10px;*/
  /*border: 1px solid #A9A9A9;*/
  border-radius: 4px;
  color: #222222;
}

.profile-link{
  color: #535353;
}

.profile-link > span{
  margin: 0 3px;
}

.co-authors-block{
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.co-authors-block > div{
  display: flex;
  flex-flow: column;
  align-items: center;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  padding: 10px 15px;
  margin: 0 10px 10px 10px;
}

.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  margin: 1rem;
}

.avatar span {
  cursor: pointer;
  text-decoration: #212121 underline;
}

.popular-coauthor-avatar {
  object-fit: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>