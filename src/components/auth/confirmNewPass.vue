<template>
  <loader v-if="loader" width="4" radius="20" style="position: relative;left: 34%" />
  <div v-else>
    <auth-message v-if="changed" :messages="messages" />
    <div v-else>
      <div class="form-control" v-if="!not_found">
        <h2>Зміна паролю</h2>
        <h3>{{ $route.query.email }}</h3>
        <div class="area-control">
          <input type="password" name="password" id="in-password" required v-model="data.password" :class="['input in-form', {invalid:valid.password}]">
          <label for="in-password" class="marker">Пароль</label>
          <small class="field-message-error">{{valid.password}}</small>
        </div>
        <div class="area-control">
          <input type="password" name="password" id="confirm-password" @keypress.enter="enter" required v-model="data.confirm_password" :class="['input in-form', {invalid:valid.confirm_password}]">
          <label for="in-password" class="marker">Підтвердження</label>
          <small class="field-message-error">{{valid.confirm_password}}</small>
        </div>
        <button :class="['sign-in-system btn primary', {load:loader}]" type="submit" @click="enter">
          Змінити пароль<loader v-if="loader" class="type-loader" :radius="8" :width="2"></loader>
        </button>
      </div>
      <div class="not-exist" v-else>
        Does not exist
        <a href="/">Go to main</a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import loader from "@/components/additional/loader";
import axios from "axios";
import AuthMessage from "@/components/auth/authMessage";

export default {

  data(){
    return {
      data: {
        hash: this.$route.query.hash,
        email: this.$route.query.email,
        password: '',
        confirm_password: ''
      },
      valid: {
        password: '',
        confirm_password: ''
      },
      check_url: {
        hash: this.$route.query.hash,
        email: this.$route.query.email
      },
      loader: true,
      not_found: false,
      changed: false,
      messages: {}
    }
  },
  methods:{
    ...mapActions(['createPass']),
    enter(){
      if (this.validate) {
        this.changePassword(this.data)
      }
    },
    changePassword(){
      axios.post(this.api_url_v1 + '/confirm-password', this.data).then(res => {
        this.changed = true
        this.messages = {
          notes:[
            {code:'password-changed'}
          ]
        }
        setTimeout(() => {
          this.$router.push('/login')
        },2000)
      },
      err => {
        this.not_found = true
        this.messages = err.response.data
        console.log('errorrrr',err.response.data.message);
      })
    }
  },
  watch:{
    'valid.password': {
      handler() {
        this.valid.password = ''
      }
    },
    'valid.confirm_password': {
      handler() {
        this.valid.confirm_password = ''
      }
    },
  },
  computed:{
    ...mapState(['api_url_v1']),

    validate(){
      const non_pass = "Введіть пароль"
      if (this.data.password === ''){
        this.valid.password = non_pass
      }
      if (this.data.password !== this.data.confirm_password){
        this.valid.confirm_password = 'Паролі не співпадають'
      }
      return !(this.valid.password || this.valid.confirm_password);
    },
    checkHash(){
      axios.post(this.api_url_v1 + '/confirm-password', this.check_url).then(res => {
        this.loader = false
      },
      err => {
        this.loader = false
        this.not_found = true
        console.log("registration user axios error: ", err.response.data);
      })
    }
  },
  mounted() {
    this.checkHash
  },
  components:{AuthMessage, loader}

}
</script>


<style scoped>

h2{
  text-align: center;
  font-size: 28px;
  color: #222222;
  position: relative;
  top: -25px;
}

.form-control > h3{
  margin: -20px auto 30px auto;
  color: #222222;
  /*font-weight: normal;*/
}

</style>