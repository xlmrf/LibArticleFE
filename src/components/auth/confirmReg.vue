<template>
  <div>
    <span v-if="loader">
      <loader />
    </span>
    <div>
      Registration Confirmed
      <auth-message :messages="messages" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState} from "vuex";
import Loader from "@/components/additional/loader";
import AuthMessage from "@/components/auth/authMessage";

export default {
  components: {AuthMessage, Loader},
  data(){
    return{
      data:{
        hash:this.$route.query.hash,
        email:this.$route.query.email
      },
      loader: false,
      messages:[]
    }
  },

  computed:{
    ...mapState(['api_url_v1']),
    checkHash(){
      this.loader = true
      axios.post(this.api_url_v1 + '/confirm-registration', this.data).then(res => {
        this.loader = false
        this.messages = [
          {
            code:'registered',
            text:'Акаунт зареєстровано'
          }
        ]
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.api_token
        localStorage.setItem('access_token', res.data.api_token);
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      },
      err => {
        this.loader = false
        this.messages = err.response.data
        console.log("registration user axios error: ", err.response.data);
      })
    }
  },
  mounted() {
    this.checkHash
  }

}
</script>

<style scoped>

</style>