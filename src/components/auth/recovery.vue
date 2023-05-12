<template>
  <div class="form-control" v-if="!sent">
    <div class="area-control">
      <input type="text" name="email" id="in-email" :disabled="loader" required v-model="data.email" :class="['input in-form', {invalid:valid.email}]" @keypress.enter="enter">
      <label for="in-email" class="marker" v-if="!loader">Email</label>
      <small>{{valid.email}}</small>
    </div>

    <button :class="['sign-in-system btn primary', {load:loader}]" :disabled="loader" type="submit" @click="enter()">
      Відправити запит<loader v-if="loader" class="type-loader" :radius="8" :width="2"></loader>
    </button>

  </div>

  <auth-message :messages="messages" v-else />

  <div class="form-trip">
    <span class="text">Якщо ви пам'ятаєте пароль, <router-link to="/login" class="text-to">ввійти</router-link></span>
  </div>
  <!--  <small class="note-text text">На вказану почту прийде повідомлення з підтвердженням.</small>-->
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import loader from "@/components/additional/loader";
import axios from "axios";
import AuthMessage from "@/components/auth/authMessage";

export default {

  mixins:['email'],
  data(){
    return{
      data:{
        email: ''
      },
      valid:{
        email:''
      },
      loader: false,
      sent:false,
      messages:[]
    }
  },
  methods:{
    enter(){
      this.loader = true
      if (this.validate) {
        this.recovery()
      }
      else {
        this.loader = false
      }
    },
    recovery(){
      axios.post(this.api_url_v1 + '/recovery-password', this.data).then(res => {
        this.messages = res.data
        this.sent = true
      },
      err => {
        this.loader = false
        this.messages = err.response.data
        console.log('err', err.response);
      })
      {

      }
    }

  },

  watch:{
    'data.email':{
      handler(){
        this.valid.email = ''
      }
    },
  },
  computed:{
    ...mapState(['api_url_v1']),
    validate(){
      if (this.checkEmail(this.data.email)){
        this.valid.email = this.emailFail
      }
      return !this.eValidate;
    }
  },
  components:{AuthMessage, loader}

}
</script>