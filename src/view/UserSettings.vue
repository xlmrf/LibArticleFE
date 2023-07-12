<template>
  <div class="settings-main-card">
    <side-bar></side-bar>
    <div class="settings-main-window">
      <div class="loader settings-loader" v-if="!getProfile?.id" >
        <loader width="2" radius="13"/>
      </div>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/settings/SideBar"
import {mapActions, mapGetters} from "vuex";
import Loader from "@/components/additional/loader";
export default {

  methods:{
    ...mapActions(['requestProfile'])
  },

  computed:{
    ...mapGetters(['getUser','getProfile']),
  },
  mounted() {
    this.requestProfile(this.getUser.id)
  },
  components:{Loader, SideBar}
}
</script>

<style>


.settings-loader{
  display: flex;
  margin: 0 auto;
  position: relative;
  right: 120px;
}


.settings-main-card{
  /*background: #F1F1F1;*/
  height: auto;
  flex-direction: row;
  display: flex;
  /*padding: 1rem;*/

}
.settings-main-card:last-child{

}
.settings-main-window{
  display: flex;
  flex-flow: column;
  flex: 1;
  border-radius: 5px;
  min-height: 500px;
}



.privacy-settings{
  display: flex;
  flex-direction: column;
  align-self: center;
  padding-bottom: 20px;
  width: 100%;
}

.privacy-settings > h2{
  padding: 1rem;
  color: #3a3a3b;
}
.privacy-settings > h2:after{
  content: '';
  position:absolute;
  width: 100%;
  height:1px;
  /*left:0;*/
  bottom:0;
  background: rgba(191, 191, 191, 0.5);
}

.privacy-settings > div{
  margin: 10px 0;
}
.person-email > span{
  margin: 1rem;
  font-weight: bold;
}

.privacy-settings > button{
  margin-top: 1rem;
  background: none;
  border: 1px solid rgba(32, 178, 170, 0.6);
  color: rgba(32, 178, 170, 0.8);
  padding: 10px 30px;
  cursor: pointer;
  align-self: center;
}

.privacy-settings > button:hover{

  border: 1px solid rgb(32, 178, 170);

}

</style>