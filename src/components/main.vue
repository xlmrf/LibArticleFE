<template>
  <navbar-menu class="nav-over"></navbar-menu>
  <div class="main" v-if="getUser.id">
    <router-view />
    profile {{getUser}}
  </div>
  <loader v-else class="mid-loader" width="3" radius="14" />
</template>

<script>
import NavbarMenu from "../view/Navbar";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import axios from "axios";
import Loader from "@/components/additional/loader";

export default {
  computed: {
    ...mapActions(['requestUser']),
    ...mapGetters(['getUser','getTypes']),
    ...mapState(['api_url_v1','types']),
  },

  data(){
    return{
      data:[]
    }
  },
  methods:{
    ...mapMutations(['updateTypes']),
    askTypes() {
      axios.get(this.api_url_v1 + '/document-types').then(response => {
        this.updateTypes(response.data)
      })
    }
  },

  mounted() {
    this.requestUser;
    this.askTypes()
  },
  components: {Loader, NavbarMenu}
}
</script>

<style scoped>
.main {
  min-height: calc(100vh - 90px);
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 56px;
  /*overflow: scroll;*/
  /*overflow-y: auto;*/
  /*overflow-x: hidden;*/
  /*margin: 56px 5rem 0;*/
}

.nav-over {
  min-height: 55px;
  position: fixed;
  width: 100%;
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
