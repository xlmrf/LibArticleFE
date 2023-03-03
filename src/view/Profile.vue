<template>
  <div class="middle-spinner" v-if="!getProfile">
<!--    <span><loader width="4" radius="20"></loader></span>-->
  </div>

  <div class="profile-card" v-else>
    <user-card :getUser="getProfile" class="user-card-component"></user-card>
    <statistic />

    <profile-documents />
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import UserCard from "@/components/profile/UserCard";
import Statistic from "@/components/profile/Statistic";
import ProfileDocuments from "@/components/profile/ProfileDocuments";

export default {
  data(){
    return{
      items:[
        "Документів додано",
        "Цього року додано",
        "Прочитано ваших документів",
        "Посилань на ваші документи",
        "Ви співавтор у 22 документах",
      ]
    }
  },
  computed:{
    ...mapActions(['requestProfile']),
    ...mapGetters(['getUniversities','getProfile'])
  },

  mounted() {
    this.requestProfile
    // this.requestAuthorPhoto
  },
  components:{ProfileDocuments, Statistic, UserCard}
}
</script>

<style scoped>
.card-profile{
  display: flex;
}
.user-card-component{
  margin: 10px 20px;
  height: 100%;
  min-width: 25%;
}
.profile-content{
  /*box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;*/
  /*background: #ffffff;*/
  border-radius: 5px;
  flex-direction: column;
  display: flex;
  margin: 10px 20px;
  width: 100%;
}
.profile-land-pick{
  padding: 10px;
  border: 1px solid blue;
}
.content-list{
  display: flex;
  flex-direction: column;
  list-style: none;
  height: 100%;
}
.content-list > li{

}
</style>