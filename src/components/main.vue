<template>
  <div v-if="getUser.id">
    <navbar-menu class="nav-over"></navbar-menu>
    <div class="main">
      <router-view>
        
      </router-view>
    </div>
  </div>
</template>

<script>
import NavbarMenu from "./navbar/NavbarMenuComponent";
import {mapActions, mapGetters} from "vuex";

export default {
  computed: {
    ...mapActions(['requestUser']),
    ...mapGetters(['getUser'])
  },

  mounted() {
    this.requestUser;
  },
  components: {NavbarMenu}
}
</script>

<style scoped>
.main {
  border: 2px solid pink;
  height: calc(100% - 56px);
  overflow: scroll;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-over {
  min-height: 55px;
  /*position: relative;*/
  z-index: 999;
  background: #fff;
}

h1 {
  margin: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}

input {
  padding: 0.3rem 1rem;
  border: 1px solid black;
}

.link {
  text-decoration: none;
  color: initial;
}

.center {
  position: absolute;
  top: 45%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.unauthorize span {
  margin: 0 5px;
  color: black;
}

.unauthorize span:hover {
  color: #727272;
}

h5 {
  text-align: center;
}

/*.nav-over{*/
/*  z-index: 9999;*/
/*  position: relative;*/
/*}*/
</style>
