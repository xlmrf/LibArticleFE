<template>
  <div class="loader" v-if="!getProfile">
    <span><loader width="2" radius="13"></loader></span>
  </div>
  <div class="user-card" v-else>
    <div class="about-user">

      <account-img :image="getProfile.image"/>

      <span>
        <label for="bio">Біо</label>
        <textarea class="sample-input textarea" placeholder="Я живу у вільній країні.&#10;I live in a free country" maxlength="80" wrap="hard" name="bio" id="bio" cols="10" rows="3" v-model="getProfile.bio"></textarea>
      </span>

      <span>
        <label for="first_name">Ім'я</label>
        <input class="sample-input" type="text" name="" id="first_name" v-model="getProfile.first_name">
      </span>
      <span>
        <label for="last_name">Прізвище</label>
        <input class="sample-input" type="text" name="" id="last_name" v-model="getProfile.last_name">
      </span>
      <span>
        <label for="middle_name">По батькові</label>
        <input class="sample-input" type="text" name="" id="middle_name" v-model="getProfile.middle_name">
      </span>
      <span>
        <label for="location">Місце проживання</label>
        <input class="sample-input" type="text" name="" id="location" v-model="getProfile.location">
      </span>
      <span class="person-university">
        <label for="university">Університет</label>
        <select v-if="getUniversities.length > 0" name="university" id="university" class="select-type" v-model="getProfile.university_id" >
          <option  v-for="university in getUniversities" :value="university.id">{{ university.label }}</option>
        </select>
      </span>
      <small v-if="error">{{ error }}</small>
      <button @click="userUpdate()">Зберегти</button>
    </div>
    <button class="user-logout-item" @click="logout">Вихід</button>
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
      newPhoto: ''
    }
  },
  computed: {
    ...mapGetters(['getUniversities', 'getUser', 'getProfile','getTempPhoto']),
    ...mapState(['api_url_v1']),
    ...mapActions(['requestUniversity']),
    logout() {
      localStorage.removeItem('access_token')
      this.updateUser('')
      this.token = null
      this.$router.push('/login')
    }
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

    ...mapActions(['requestProfile']),

    userUpdate() {
      console.log('upd user')
      this.getProfile.image = this.getTempPhoto.image
      axios.patch(this.api_url_v1+'/user', this.getProfile).then(res => {
        this.updateProfile(null)
        this.requestProfile(this.getUser.id)
        console.log("user settings", res.data);
        this.$router.push('/profile/'+this.getUser.id)
      }).catch(err => {
        console.log('set user error:', err.response);
        // this.error = err.response
      })
    },

    ...mapMutations(['updateProfile']),

    save() {
      // for (let item in this.data.info){
      //   if (item === ''){
      //      return this.error = ''
      //    }
      // }
      // this.error = ''
      // let info = this.data.info
      // if (!info.last_name || !info.first_name || !info.location) {
      //   return this.error = 'Заповніть усі поля'
      // }

    },

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

.loader{
  display: flex;
  position: relative;
  margin: 0 auto;
  right: 120px;

}

.textarea{
  width: 80%;
}

.person-university{
  display: flex;
  position: relative;
}

.pulse-loader{
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

.about-user > span{
  display: flex;
  width: 100%;
  justify-content: center;
  flex-flow: column;
  margin: 0.3rem 0;
  align-items: center;

}

.about-user > span label{
  margin: 5px 2px;
  position: relative;
  align-self: baseline;
  left: 10%;
}

.about-user > span input{
  font-size: 18px;
  padding: 5px 10px;
  display: block;
  justify-content: center;
  width: 80%;
  border: 1px solid #cecece;
  border-radius:3px;
  position: relative;
  color: #212121;
}

.about-user > span select{
  font-size: 14px;
  padding: 0 5px;
  display: block;
  justify-content: center;
  width: 80%;
  height:2.5rem;
  border: 1px solid #cecece;
  border-radius:3px;
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
  width: 120px;
  height: 30px;
  cursor: pointer;
  align-self: center;
  padding: 5px;
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

.user-logout-item {
  margin: 1rem;
  align-self: center;
  cursor: pointer;
  background: none;
  border: 1px solid;
  width: 100px;
  height: 30px;
  color: rgba(229, 50, 45, 0.85);
}
</style>