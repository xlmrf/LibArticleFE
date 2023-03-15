<template>
  <div>{{getProfile}}</div>
  <div class="middle-spinner" v-if="!data">
    <span><loader width="4" radius="20"></loader></span>
  </div>
  <div class="user-card" v-else>
    <div class="avatar">
      <img :class="['user-avatar']" :src="getPhoto" alt="">
      <input class="photo-loader-input" type="file" id="files" @change="photoUpdate()" accept="image/jpeg,image/png"
             ref="image">
      <span @click="changePhoto()">change photo</span>
      <!--          https://i.photographers.ua/images/pictures/45416/dsc_4556_1.jpg-->
    </div>
    <div class="about-user">
      <span>
        <label for="last_name">Прізвище</label>
        <input class="inp-e" type="text" name="" id="last_name" v-model="data.info.last_name">
      </span>
      <span>
        <label for="first_name">Ім'я</label>
        <input class="inp-e" type="text" name="" id="first_name" v-model="data.info.first_name">
      </span>
      <span>
        <label for="middle_name">По батькові</label>
        <input class="inp-e" type="text" name="" id="middle_name" v-model="data.info.middle_name">
      </span>
      <span>
        <label for="location">Місце проживання</label>
        <input class="inp-e" type="text" name="" id="location" v-model="data.info.location">
      </span>
      <span class="person-university">
        <label for="university">Університет</label>
        <select name="university" id="university" class="select-type" v-model="data.info.university">
          <option v-for="university in getUniversities" :value="university">{{ university.label }}</option>
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
    ...mapGetters(['getUniversities', 'getPhoto', 'getProfile']),
    ...mapActions(['requestUniversity', 'requestProfile']),
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
    ...mapActions(['requestUser', 'setUser']),
    ...mapMutations(['updateUser']),
    photoUpdate() {
      let image = this.$refs.image.files;
      let form = new FormData();
      form.set('file', image[0]);
      console.log('file:', form);
      axios.post('http://192.168.0.102/api/upload-image', form).then(response => {
        this.newPhoto = response.data.nameFile;
        this.data.info.image = this.newPhoto;
      }, error => console.log('Server catch error', error));
    },
    changePhoto() {
      this.valid = false
      this.$refs.image.click()
    },
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
    cancelChanges() {
      this.changes = false
      this.requestUser()
    },
    push() {
      this.photoUpdate = !this.photoUpdate
    }
  },
  components: {
    Loader
  },
  mounted() {
    this.requestProfile
    this.requestUniversity
  }
}
</script>

<style scoped>


.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  margin: 1rem;
}

.avatar span {
  cursor: pointer;
  text-decoration: #212121 underline;
}

.user-avatar {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  object-fit: cover;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.user-avatar:hover {
  /*color: rgba(33, 33, 33, 0.34);*/
  /*clip-path: ellipse(200px 200px at 0px 10px);*/
}

/*.photo-update-icon{*/
/*  background: rgba(0, 0, 0, 0.54);*/
/*  position: absolute;*/
/*  clip-path: ellipse(255px 50px at 100px 210px);*/
/*  transition: transform 1s ease;*/
/*}*/
/*.user-avatar::after{*/
/*  content: '';*/
/*  position: absolute;*/
/*  height: 10px;*/
/*  width: 10px;*/
/*  border: 1px solid red;*/
/*}*/
.photo-loader-input {
  position: absolute;
  display: none;
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