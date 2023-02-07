<template>
    <div class="user-card">
        <div class="avatar">
          <span class="user-avatar-loader" v-if="!getPhoto"><loader width="4" radius="20"></loader></span>
<!--          <img class="user-avatar" v-else :src="getPhoto !== 'not_found'? 'http://s1.libarticle.loc/api/image/'+ getPhoto : 'http://s1.libarticle.loc/api/image/default-image'" alt="">-->
          <img :src="getPhoto" class="user-avatar" alt="user photo" v-else>
        </div>
        <hr>
        <div class="personal-info">
          <div class="about-user">
            <span class="person-full-name">{{getUser.first_name}} {{getUser.middle_name}} {{getUser.last_name}}</span>
<!--            <span class="person-email">{{getUser.email}}</span>-->
<!--            <span class="person-location"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>{{getUser.info.location}}</span>-->
<!--            <span class="person-university" v-if="getUser.info.university">{{getUser.info.university.label}}</span>-->
          </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Loader from "../../components/additional/LoaderComponent";

export default {
  props:['getUser'],
  computed:{
    ...mapGetters(['getPhoto','getAuthorPhoto','getAltPhoto']),
  },
  methods:{
    ...mapMutations(['updatePhoto'])
  },
  components: {Loader},
  async mounted() {
    await this.updatePhoto(this.getUser.image)
  }
}
</script>

<style scoped>
.avatar{
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;

}
.user-card{
  /*background: #F7F7FB;*/
  min-width: 250px;
  width: 330px;
  height: 100%;
  /*box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;*/
}

.user-avatar-loader{
  width: 200px;
  height: 200px;
  position: relative;
}
.user-avatar-loader >*{
  position: relative;
  top: 72px;
  left: 76px;
}
.user-avatar{
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  object-fit: cover;
  width: 200px;
  height: 200px;
  border-radius: 50%;
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

</style>
