<template>
  <div class="middle-spinner" v-if="!getProfile">
    <span><loader width="4" radius="20"></loader></span>
  </div>

  <div class="profile-card" v-else>
    <user-card :getUser="getProfile" class="user-card-component"></user-card>
    <user-info />
<!--    <statistic />-->
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import loader from "@/components/additional/loader";
import UserCard from "@/components/profile/UserCard";
import Statistic from "@/components/profile/Statistic";
import ProfileDocuments from "@/components/profile/ProfileDocuments";
import UserInfo from "@/components/profile/UserInfo";

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
  watch: {
    '$route.params.id': {
      handler(item) {
        this.requestProfile(this.getUser.id)
      }
    }
  },

  methods:{
    ...mapActions(['requestProfile']),
  },

  computed:{
    ...mapGetters(['getUniversities','getProfile','getUser'])
  },

  mounted() {
    this.requestProfile(this.getUser.id)
    // this.requestAuthorPhoto
  },
  components:{UserInfo, ProfileDocuments, Statistic, UserCard,loader}
}
</script>

<style scoped>
.card-profile{
  display: flex;
}
.user-card-component{
  /*margin: 10px 20px;*/
  height: 100%;
  min-width: 25%;
}


.profile-card{
  display: flex;
  padding-top: 1rem;
}

.profile-card >:nth-child(1){
  flex: 1;
}

.profile-card >:nth-child(2){
  flex: 4;
}

/*.profile-card >:nth-child(3){*/
/*  flex: 1;*/
/*}*/

.profile-card > div{
  padding: 1rem;
}



.input{
  font-size: 18px;
  padding: 10px;
  display: block;
  width: 100%;
  border: 1px solid #cecece;
  border-radius:7px;
  position: relative;
  height: 2.7rem;
  color: #212121;
  /*border-bottom: 1px solid #ccc;*/
}

.input:valid {
  border: 1px solid #1059FF;
}

.input:hover {
  border: 1px solid #212121;
}

.input:focus {
  outline: none;
  border: 2px solid #212121;
}



/**********old************/


/*.profile-content{*/
/*  !*box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;*!*/
/*  !*background: #ffffff;*!*/
/*  border-radius: 5px;*/
/*  flex-direction: column;*/
/*  display: flex;*/
/*  margin: 10px 20px;*/
/*  width: 100%;*/
/*}*/
/*.profile-land-pick{*/
/*  padding: 10px;*/
/*  border: 1px solid blue;*/
/*}*/
/*.content-list{*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  list-style: none;*/
/*  height: 100%;*/
/*}*/
.content-list > li{

}
</style>