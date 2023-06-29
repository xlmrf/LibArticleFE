<template>
  <div class="main-card">
    <side-bar></side-bar>
    <div class="main-window">
      <div class="loader" v-if="!getProfile?.id" >
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

<style scoped>


.loader{
  display: flex;
  margin: 0 auto;
  position: relative;
  right: 120px;
}


.main-card{
  /*background: #F1F1F1;*/
  height: auto;
  flex-direction: row;
  /*padding: 1rem;*/

}
.main-card:last-child{

}
.main-window{
  display: flex;
  flex-flow: column;
  flex: 1;
  border-radius: 5px;
  min-height: 500px;
}


</style>