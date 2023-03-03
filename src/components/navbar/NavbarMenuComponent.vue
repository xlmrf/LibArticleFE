<template>
  <!--  navbar-->
  <div class="navbar">
    <div class="logo"><span @click="$router.push('/')">LibArticle</span></div>
    <div class="manual">
      <input type="text" name="search" id="search" class="input searcher" required v-model="keywords"
             @keydown.enter="query(keywords)">
      <span class="search-icon" @click="query(keywords)">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
             viewBox="0 0 24 24" fill="none" stroke="#B2B2B2"
             stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
      <small class="title-error" v-if="false">Введите полный адрес</small>
      <!--      <button :class="['btn search-btn',{'valid-btn':keyword}]" >Пошук</button>-->
      <label v-if="mistake">{{ mistake }}</label>

      <!--      <router-link to="/profile" class="manual-item">-->
      <!--        <span>Акаунт</span>-->
      <!--      </router-link>-->
      <!--      <router-link to="/library" class="manual-item">-->
      <!--        <span>Документи</span>-->
      <!--      </router-link>-->
      <!--      <router-link to="/new_document" class="manual-item">-->
      <!--        <span>Додати</span>-->
      <!--      </router-link>-->
      <!--      <router-link to="/history" class="manual-item">-->
      <!--        <span>Історія</span>-->
      <!--      </router-link>-->

    </div>
    <div class="user-icon">
      <user-notices></user-notices>
      <user-logo></user-logo>
    </div>
    <!--    <new-document v-if="door" class="new-document-template"></new-document>-->
  </div>
</template>

<script>
import NewDocument from "../new_document/select_type/NewDocumentBaseComponent"
import UserLogo from "./NavUserMiniLogoComponent"
import UserNotices from "./UserNotificationsComponent"
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      keywords: this.$route.query.q ? this.$route.query.q : '',
      mistake: '',
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['updateUser']),
    query(keywords) {

      const {...query} = this.$route.query;

      delete query.page;
      delete query.q;

      let data = {};
      if (keywords !== '') {
        data = {q: keywords};
      }
      console.log(data)
      let name = 'documents';
      if (this.$route.name === 'my-documents') {
        name = 'my-documents';
      }

      this.$router.push({
        name: name,
        query: {...query, ...data}
      })
    }

  },
  created() {

    // close user drop list
    // document.addEventListener('click', function (e) {
    //   if (e.target.className !== 'user-avatar' && e.target.className !== 'user-nickname' && e.target.className !== 'drop-list-item')
    //     this.dropToggle = false;
    // }.bind(this));

  },
  mounted() {
    if (this.$route.query.search) {
      this.keywords = this.$route.query.search
    }

  },
  components: {UserLogo, UserNotices, NewDocument}
}
</script>

<style scoped>
.search-icon {
  position: relative;
  display: flex;
  align-self: center;
  margin-left: -36px;
  color: rgba(33, 33, 33, 0.65);
  cursor: pointer;
}

.search-icon svg:hover {
  stroke: #222222;
}

/*.new-document-template{*/
/*  background: rgba(241, 241, 241, 0.88);*/
/*  position: absolute;*/
/*  top: 50%;*/
/*  left: 50%;*/
/*  border-radius: 10px;*/
/*  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;*/
/*  margin-right: -50%;*/
/*  transform: translate(-50%, -50%);*/
/*  z-index: 999;*/
/*}*/
.navbar {
  font-size: 18px;
  padding: 0 2rem;
  align-items: center;
  height: 56px;
  /*border-bottom: 1px solid ;*/
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 1px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}

.user-icon {
  display: flex;
  justify-self: right;
  align-items: center;
  max-width: 150px;
  grid-column-end: -1;
}

.user-icon > svg {
  cursor: pointer;
}

.navbar > div {
  height: auto;
}

.manual {
  display: flex;
}

.dropdown-content > span {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.nav-notice svg:hover {
  fill: #1535a5;
}

.nav-library svg:hover {
  fill: #1535a5;
}


.btn {
  color: rgba(33, 33, 33, 0.56);
  position: relative;
  place-content: center;
  place-items: center;
  width: fit-content;
  letter-spacing: 0.05em;
  border: 1px solid rgba(33, 33, 33, 0.55);
  text-transform: uppercase;
  margin-right: 10px;
  padding: 0.5rem 1.5rem;
  font-weight: 700;
  outline: none;
  background: #fff;
  transition: all 0.22s;
}

.search-btn:hover {
  color: #0d2839;
  border: 1px solid #0d2839;
}

.search-btn {
  margin-left: 15px;
}

.searcher {
  border: 1px solid #ccc;
  padding: 0.5rem 1.5rem;
  border-radius: 3px;
  font-size: 18px;
  resize: none;
  outline: none;
  width: 100%;
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
  -ms-transition: all .3s ease-out;
  -o-transition: all .3s ease-out;
  transition: all .3s ease-out
  /*min-width: 200px;*/
}

.searcher:valid,
.searcher:focus {
  border: 1px solid #212121;
}

.searcher:focus,
.searcher:hover {
  border: 1px solid #419FD9;
}

.valid-btn {
  border: 1px solid #212121;
  color: #212121;
}

.logo span {
  font-size: 20px;
  text-transform: uppercase;
  cursor: pointer;
}


/*.manual-item{*/
/*  padding:10px 20px;*/
/*  text-decoration:none;*/
/*  background: none;*/
/*  !*   border:1px solid #999; *!*/
/*  position:relative;*/
/*  border: none;*/
/*  outline: none;*/
/*  color: #212121*/
/*}*/
/*.manual-item::after{*/
/*  content:'';*/
/*  position:absolute;*/
/*  width:100%;*/
/*  height:0.1rem;*/
/*  left:0;*/
/*  bottom:0;*/
/*  background: #141414;*/
/*}*/
/*.manual-item{*/
/*  overflow:hidden;*/
/*}*/
/*.manual-item::after{*/
/*  transform: translateY(3px);*/
/*  transition: transform 0.3s ease;*/
/*}*/
/*.manual-item:hover::after{*/
/*  transform: translateY(0);*/
/*}*/

/*.manual-item::after{*/
/*  transform:scale(0,1);*/
/*  transition: transform 0.22s ease;*/
/*}*/
/*.manual-item:hover::after{*/
/*  transform:scale(1,1);*/
/*}*/

</style>
