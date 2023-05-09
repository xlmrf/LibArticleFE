<template>
  <div>
<!--    <small>pages</small>-->
<!--    <div>-->
<!--      <label for="author_email">Email</label>-->
<!--      <input type="text"-->
<!--             name="author_email" id="author_email"-->
<!--             v-model="pages"-->
<!--             class='sample-input'-->
<!--             required>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  data(){
    return{
      pages:''
    }
  },
  props:['isReady']

}
</script>

<style scoped>

</style>