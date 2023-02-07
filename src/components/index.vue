<template>
  <div>
    <h2>User</h2>
<!--    <p>{{getUser}}</p>-->
<!--    <span v-if="getMessage">{{getMessage}}</span>-->
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {

  methods:{
  },
  computed:{
    // ...mapActions(['requestUser']),
    ...mapGetters(['getUser','getMessage'])
  },
  mounted() {
    // this.requestUser
  }
}
</script>

<style scoped>

</style>