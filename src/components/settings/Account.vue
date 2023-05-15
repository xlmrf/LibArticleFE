<template>
  <div>{{getProfile}}</div>
  <div class="loader" v-if="false">
    <span><loader width="2" radius="13"></loader></span>
  </div>
  <div class="user-card" v-else>
    <div class="about-user">
      <span>
        <label for="last_name">Прізвище</label>
        <input class="sample-input" type="text" name="" id="last_name" v-model="getProfile.last_name">
      </span>
      <span>
        <label for="first_name">Ім'я</label>
        <input class="sample-input" type="text" name="" id="first_name" v-model="getProfile.first_name">
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
        <select name="university" id="university" class="select-type" v-model="getProfile.university">
          <option v-for="university in [getProfile.university]" :value="university">{{ university.label }}</option>
        </select>
      </span>
      <small v-if="error">{{ error }}</small>
      <button @click="save">Зберегти</button>
    </div>
    <button class="user-logout-item" @click="logout">Вихід</button>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Loader from "../additional/loader";
import axios from "axios";
import PulseLoader from "@/components/additional/pulseLoader";

export default {
  data() {
    return {
      data: {
        info: {
          last_name: '',
          first_name: '',
          middle_name: '',
          university: '',
          location: ''
        }
      },
      error: '',
      newPhoto: ''
    }
  },
  computed: {
    ...mapGetters(['getUniversities', 'getUser', 'getProfile']),
    ...mapActions(['requestUniversity']),
    logout() {
      localStorage.removeItem('access_token')
      this.updateUser('')
      this.token = null
      this.$router.push('/login')
    }
  },
  watch: {
    'data.info.university': {
      handler(key) {
        if (this.data.info && key !== null) {
          this.data.info.university_id = key.id
        }
      }
    }
  },
  methods: {
    ...mapActions(['setUser']),
    ...mapMutations(['updateUser']),

    save() {
      // for (let item in this.data.info){
      //   if (item === ''){
      //      return this.error = ''
      //    }
      // }
      this.error = ''
      let info = this.data.info
      if (!info.last_name || !info.first_name || !info.location) {
        return this.error = 'Заповніть усі поля'
      }
      this.data.info.university_id = this.data.info.university.id
      delete this.data.info.document_count
      this.setUser(this.data)
    },

    push() {
      this.photoUpdate = !this.photoUpdate
    }
  },
  components: {
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
  margin: 0.3rem 0;
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
  height: 0.1rem;
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