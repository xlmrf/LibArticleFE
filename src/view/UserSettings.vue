<template>
  <div class="main-card">
    <side-bar></side-bar>
    <div class="main-window">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/settings/SideBar"
export default {

  components:{SideBar}
}
</script>

<style scoped>
.main-card{
  /*background: #F1F1F1;*/
  height: auto;
  flex-direction: row;
  padding: 1rem;
  /*padding: 1rem;*/

}
.main-card:last-child{

}
.main-window{
  background: #fff;
  margin: 0 5%;
  padding: 10px;
  width: 60%;
  border-radius: 5px;
}


</style>