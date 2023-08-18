<template>
  <div class="modal-component modal-draft">
    Hello it is draft component
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {

  data(){
    return{
      openModal:false,
    }
  },

  methods:{

  },

  computed:{
    ...mapState(['api_url_v1']),
  }
}
</script>

<style scoped>

</style>