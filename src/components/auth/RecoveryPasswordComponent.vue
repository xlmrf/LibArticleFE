<template>
  <div class="form-control">
    <div class="area-control">
      <input type="text" name="email" id="in-email" :disabled="getUserMessage.agree || loader" required v-model="data.email" :class="['input in-form', {invalid:eValidate}]" @keypress.enter="enter">
      <label for="in-email" class="marker" v-if="!getUserMessage.agree && !loader">Email</label>
      <small>{{eValidate}}</small>
    </div>
<!--    <div class="alert" v-if="getUserMessage !== 'ok' && getUserMessage">-->
<!--      <small v-if="getUserMessage.agree">-->
<!--        {{getUserMessage}}-->
<!--      </small>-->
<!--      <small v-else>-->
<!--      </small>-->
<!--    </div>-->
    <div v-if="getUserMessage.error" class="alert alert-error">
<!--      :class="'alert-'+Object.keys(getUserMessage.message)[0]"-->
      <small>
        <span v-for="error in getUserMessage.error">{{error[0]}}</span>
<!--        <router-link class="link-reset" to="/forget-password">Відновити пароль</router-link>-->
      </small>
    </div>
    <div v-if="getUserMessage.agree" class="alert alert-warning">
      <!--      :class="'alert-'+Object.keys(getUserMessage.message)[0]"-->
      <small>
        <span>{{getUserMessage.agree}}</span>
        <!--        <router-link class="link-reset" to="/forget-password">Відновити пароль</router-link>-->
      </small>
    </div>
    <button :class="['sign-in-system btn primary', {load:loader}]" :disabled="loader" type="submit" @click="enter()" v-if="!getUserMessage.agree">
      Відправити запит<loader v-if="loader" class="type-loader" :radius="8" :width="2"></loader>
    </button>

  </div>
  <div class="form-trip">
    <span class="text">Якщо ви пам'ятаєте пароль, <router-link to="/login" class="text-to">можете ввійти</router-link></span>
    <!--                <span class="text">remember your <router-link to="#" class="text-to link">password</router-link></span>-->
  </div>
<!--  <small class="note-text text">На вказану почту прийде повідомлення з підтвердженням.</small>-->
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import loader from "../additional/LoaderComponent"
import email from "../../mixins/email";

export default {

  mixins:[email],
  data(){
    return{
      data:{
        email: ''
      },
      eValidate: '',
      loader: false,
    }
  },
  methods:{
    ...mapActions(['recoveryPass']),
    ...mapMutations(['userMessages']),
    enter(){
      this.userMessages('')
      this.loader = true
      if (this.validate) {
        this.recoveryPass(this.data)
        console.log('enter ok');
      }
      else {
        this.loader = false
        console.log('enter bad');
      }
    }
  },
  watch:{
    getUserMessage(){
      if (this.getUserMessage.status === 422){
        this.loader = false
      }
    },
    'data.email':{
      handler(){
        this.eValidate = ''
        this.status = ''
      }
    },
  },
  computed:{
    ...mapGetters(['getUserMessage']),
    validate(){
      if (this.checkEmail(this.data.email)){
        this.eValidate = this.emailFail
      }
      return !this.eValidate;
    }
  },
  mounted() {
    this.userMessages('')
  },
  components:{loader}

}
</script>