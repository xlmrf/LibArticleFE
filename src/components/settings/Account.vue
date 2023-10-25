<template>
  <div class="loader" v-if="!getProfile">
    <span><loader width="2" radius="13"></loader></span>
  </div>
  <div class="user-card" v-else>
    <div class="loader-logout" v-if="logoutLoader">
      <loader loader_class="over-wall" width="2" radius="13"></loader>
    </div>
    <div class="about-user">

      <account-img :image="getProfile.image"/>

      <span class="person-bio">
        <label for="bio">{{ this.$store.getters.getLanguage.settings.account_titles.bio }}</label>
        <textarea class="sample-input textarea" placeholder="" maxlength="80" wrap="hard" name="bio" id="bio" cols="10"
                  rows="3" v-model="getProfile.bio"></textarea>
        <span
            class="hint-person-bio">Наприклад: 42 роки, доцент кафедри РТС, КПІ. Досліджую високочастотні приймачі.</span>
      </span>

      <span>
        <label for="first_name">{{ this.$store.getters.getLanguage.settings.account_titles.first_name }}</label>
        <input class="sample-input" type="text" name="" id="first_name" v-model="getProfile.first_name">
      </span>
      <span>
        <label for="last_name">{{ this.$store.getters.getLanguage.settings.account_titles.last_name }}</label>
        <input class="sample-input" type="text" name="" id="last_name" v-model="getProfile.last_name">
      </span>
      <span>
        <label for="middle_name">{{ this.$store.getters.getLanguage.settings.account_titles.middle_name }}</label>
        <input class="sample-input" type="text" name="" id="middle_name" v-model="getProfile.middle_name">
      </span>
      <span>
        <label for="location">{{ this.$store.getters.getLanguage.settings.account_titles.city }}</label>
        <input class="sample-input" type="text" name="" id="location" v-model="getProfile.location">
      </span>
      <span class="person-university">
        <label for="university">{{ this.$store.getters.getLanguage.settings.account_titles.university }}</label>
        <select v-if="getUniversities.length > 0" name="university" id="university" class="select-type"
                v-model="getProfile.university_id">
          <option v-for="university in getUniversities" :value="university.id">{{ university.label }}</option>
        </select>
      </span>
      <small v-if="error">{{ error }}</small>
      <button @click="userUpdate()">{{ this.$store.getters.getLanguage.settings.account_titles.btn_save_info }}</button>
    </div>
    <button class="user-logout-item" @click="logout">
      {{ this.$store.getters.getLanguage.settings.account_titles.btn_logout }}
    </button>
    <small class="text-error small-error">{{ logoutError }}</small>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import Loader from "../additional/loader";
import axios from "axios";
import PulseLoader from "@/components/additional/pulseLoader";
import router from "@/router";
import AccountImg from "@/components/settings/accountImg";

export default {
  data() {
    return {
      error: '',
      newPhoto: '',
      logoutError: '',
      logoutLoader: false
    }
  },
  computed: {
    ...mapGetters(['getUniversities', 'getUser', 'getProfile', 'getTempPhoto']),
    ...mapState(['api_url_v1']),
    ...mapActions(['requestUniversity']),
    logout() {
      this.logoutLoader = true
      axios.get(this.api_url_v1 + '/logout').then(() => {
        this.logoutLoader = false
        this.updateProfile({})
        localStorage.removeItem('access_token')
        this.$router.push('/login')
      }).catch(error => {
        this.logoutLoader = false
        this.logoutError = error.data
      })
    },
    validate() {
      // for (let item in this.data.info){
      //   if (item === ''){
      //      return this.error = ''
      //    }
      // }
      // this.error = ''

      if (!this.getProfile.last_name || !this.getProfile.first_name || !this.getProfile.location) {
        return this.error = 'Заповніть усі поля'
      }
      return false
    },
  },
  watch: {
    // 'getProfile.university': {
    //   handler(key) {
    //     if (this.data.info && key !== null) {
    //       this.data.info.university_id = key.id
    //     }
    //   }
    // }
  },
  methods: {

    ...mapActions(['requestProfile', 'requestUser']),

    userUpdate() {
      console.log('upd user')
      if (this.getTempPhoto.image !== '') {
        this.getProfile.image = this.getTempPhoto.image
      }
      if (!this.validate) {
        console.log('upd user after')
        axios.patch(this.api_url_v1 + '/user', this.getProfile).then(res => {
          //this.updateUser(res.data)
          this.requestUser()
          console.log("user settings", res.data);
          this.$router.push('/profile/' + this.getUser.id)
        }).catch(err => {
          console.log('set user error:', err.response);
          // this.error = err.response
        })
      }
    },

    ...mapMutations(['updateProfile']),

    push() {
      this.photoUpdate = !this.photoUpdate
    }
  },
  components: {
    AccountImg,
    PulseLoader,
    Loader
  },
  mounted() {
    this.requestUniversity
  }
}
</script>

<style scoped>

.loader {
  display: flex;
  position: relative;
  margin: 0 auto;
  right: 120px;
}

.loader-logout {
  position: fixed;
  left: 53%;
  z-index: 9;
  top: 40%;
}

.textarea {
  width: 80%;
}

.person-university {
  display: flex;
  position: relative;
}

.person-bio {
  position: relative;
}

.hint-person-bio {
  /*position: absolute;*/
  font-size: 14px;
  color: #333333;
  /*right: -50px;*/
  width: 80%;
  margin-top: 10px;
  cursor: default;
}

.pulse-loader {
  position: absolute;
  left: 50%;
  bottom: -20px;
}

.user-card {
  display: flex;
  flex-direction: column;
}

.select-type {
  width: 100%;
  height: 30px;
  border: 1px solid #CCCCCC;
  background: rgba(241, 241, 241, 0.5);
}

.about-user {
  display: inherit;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  outline: none;
  width: 40%;
}

.about-user > span {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-flow: column;
  margin: 0.3rem 0;
  align-items: center;

}

.about-user > span label {
  margin: 6px;
  position: relative;
  letter-spacing: 1px;
  color: #272727;
  align-self: baseline;
  left: 10%;
}

.about-user > span input {
  font-size: 18px;
  padding: 5px 10px;
  display: block;
  justify-content: center;
  width: 80%;
  border: 1px solid #cecece;
  border-radius: 3px;
  position: relative;
  color: #212121;
}

.about-user > span select {
  font-size: 14px;
  padding: 0 5px;
  display: block;
  justify-content: center;
  width: 80%;
  height: 2.5rem;
  border: 1px solid #cecece;
  border-radius: 3px;
  position: relative;
  color: #212121;
}

.about-user > span input:valid {
  border: 1px solid #1059FF;
}

.about-user > span input:hover {
  border: 1px solid #212121;
}

.about-user > span input:focus {
  outline: none;
  border: 1px solid #212121;
}


.about-user > button {
  margin: 1rem;
  background: none;
  border: 1px solid rgba(32, 178, 170, 0.8);
  color: rgba(32, 178, 170, 0.8);
  padding: 10px 30px;
  cursor: pointer;
  align-self: center;
}

button {
  padding: 10px 40px;
}

.about-user::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0;
  bottom: 0;
  background: #BBBBBB;
}

.about-user::after {
  transform: scale(1, 1);
  transition: transform 0.1s ease;
}

.about-user > small {
  align-self: center;

  border-bottom: 1px solid rgba(229, 50, 45, 0.85);
  margin: 0.5rem;
  color: rgba(229, 50, 45, 0.85);
}

.small-error {

  text-align: center;

}

.user-logout-item {
  margin: 1rem;
  align-self: center;
  cursor: pointer;
  background: none;
  border: 1px solid;
  color: rgba(229, 50, 45, 0.85);
}
</style>