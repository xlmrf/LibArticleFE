<template>
  <loader v-if="loader" width="3" radius="15" style="position: relative; left: 33%"/>
  <div v-else>
    <div v-if="!error">
      Registration Confirmed...
    </div>
    <div class="not-exist" v-else>
      Does not exist
      <a href="/">Go to main</a>
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
      error:false,
    }
  },

  computed:{
    ...mapState(['api_url_v1']),
    checkHash(){
      this.loader = true
      axios.post(this.api_url_v1 + '/confirm-registration', this.data).then(res => {
        this.loader = false
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.api_token
        localStorage.setItem('access_token', res.data.api_token);
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      },
      err => {
        this.loader = false
        this.error = true
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