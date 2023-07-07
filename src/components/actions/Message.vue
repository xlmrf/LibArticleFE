<template>
  <div>
    <h2>{{message.type}}</h2>
    <p>{{message.text}}</p>
  </div>
</template>

<script>
export default {

props:['message']

}
</script>

<style scoped>

</style>