<template>
  <div class="form-control">
    <div class="form-control">
      <div class="area-control">
        <input type="password" name="password" id="in-password" @keypress.enter="enter" required v-model="data.password" :class="['input in-form', {invalid:pValidate}]">
        <label for="in-password" class="marker">Пароль</label>
        <small>{{pValidate}}</small>
      </div>
      <div class="area-control">
        <input type="password" name="password" id="confirm-password" @keypress.enter="enter" required v-model="data.c_password" :class="['input in-form', {invalid:cValidate}]">
        <label for="in-password" class="marker">Підтвердження паролю</label>
        <small>{{cValidate}}</small>
      </div>
<!--      <div class="alert" v-if="getMessage !== 'ok' && getMessage">-->
<!--        <small v-if="getMessage === 'ok'">-->
<!--          Пароль змінено!-->
<!--        </small>-->
<!--        <small v-else>-->
<!--          {{getMessage['email']}}-->
<!--        </small>-->
<!--      </div>-->
<!--      <router-link class="btn primary link" type="submit" to="/login">-->
<!--        Авторизація-->
<!--      </router-link>-->
      <button :class="['sign-in-system btn primary', {load:loader}]" type="submit" @click="enter">
        Змінити пароль<loader v-if="loader" class="type-loader" :radius="8" :width="2"></loader>
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import loader from "../additional/loader"
import email from "../../mixins/email"

export default {

  data(){
    return{
      data:{
        token: this.$route.params.token,
        password: '',
        c_password: ''
      },
      pValidate: '',
      cValidate: '',
      loader: false,
    }
  },
  methods:{
    ...mapActions(['createPass']),
    // ...mapMutations(['userMessages']),
    enter(){
      // this.userMessages('')
      this.loader = true
      if (this.validate) {
          this.createPass(this.data)
          console.log('enter ok');
      }
      else {
        this.loader = false
        console.log('enter bad');
      }
    }
  },
  watch:{
    getMessage(){
      console.log('watch', this.getMessage);
      this.loader = false
    },
    password(){
      this.pValidate = ''
    },
  },
  computed:{
    // ...mapGetters(['getMessage']),
    validate(){
      const non_pass = "Введіть пароль"
      if (this.data.password === ''){
        this.pValidate = non_pass
      }
      if (this.data.password !== this.data.c_password){
        this.cValidate = 'різні паролі'
      }
      return !(this.pValidate || this.cValidate);
    }
  },
  mounted() {
    // this.userMessages('')
    // if (localStorage.getItem('uuid')){
    //     this.uuid = localStorage.getItem('uuid')
    // }
  },
  components:{loader}

}
</script>