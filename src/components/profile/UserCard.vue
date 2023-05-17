<template>
  <div class="user-card">
    <div class="avatar">
      <span class="user-avatar-loader" v-if="!getPhoto"><loader width="4" radius="20"></loader></span>
<!--      <img class="user-avatar" v-else :src="getPhoto !== 'not_found'? 'http://s1.libarticle.loc/api/image/'+ getPhoto : 'http://s1.libarticle.loc/api/image/default-image'" alt="">-->
      <img :src="getPhoto" class="user-avatar" alt="user photo" v-else>
<!--      <img src="http://s1.libarticle.loc/api/image/8ce89c4463c131a217ce60e4b437407c46279b5b5fff2c0d020d5ee51ee757ba" alt="">-->
    </div>
    <hr>
    <div class="personal-info">
      <div class="about-user">
        <span class="person-full-name">{{getUser.last_name}} {{getUser.first_name}}</span>
        <!--            <span class="person-email">{{getUser.email}}</span>-->
        <span class="person-mind">{{ getUser.bio }}</span>
        <span class="person-location" v-if="getUser.location"><svg class="user-card-symbol" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg>{{getUser.location}}</span>
        <span class="person-university" v-if="getUser.university?.label"><svg class="user-card-symbol" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"></path></svg>
          {{getUser?.university?.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Loader from "@/components/additional/loader";

export default {
  components: {Loader},
  props:['getUser'],
  computed:{
    ...mapGetters(['getPhoto','getAuthorPhoto','getAltPhoto']),
  },
  methods:{
    ...mapMutations(['updatePhoto'])
  },
  // async mounted() {
  //   await this.updatePhoto(this.getUser.image)
  // }
}
</script>

<style scoped>
.avatar{
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;

}

.person-mind{
  white-space: pre-line;
}

.user-card{
  /*background: #F7F7FB;*/
  /*margin: 20px;*/
  min-width: 250px;
  width: 330px;
  height: 100%;
  color: #222222;
  /*box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;*/
}

.user-avatar-loader{
  width: 200px;
  height: 200px;
  position: relative;
}
.user-avatar-loader >*{
  position: relative;
}
.user-avatar{
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  object-fit: cover;
  width: 250px;
  height: 250px;
}

.about-user{
  display: flex;
  flex-flow: column;
}

.person-full-name{
  font-size: 1.5em;
  margin: 20px;
  text-align: center;
}

.person-email{
  font-size: 1.2em;
  font-weight: bold;
}

.person-location{
  font-size: 1.4em;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
}
.person-university{
  font-size: 1.1em;
  margin: 0.3rem 0;
}

.user-card-symbol{
  margin-right: 5px;
}

</style>
