<template>
  <div class="tumbler-filter">
    <svg xmlns="http://www.w3.org/2000/svg" v-if="toggle" width="24" height="30" viewBox="0 0 24 24" stroke="fff" fill="fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 9l6 6 6-6-12 0"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" v-else width="24" height="30" viewBox="0 0 24 24" stroke="fff" fill="fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6 0 12"/></svg>
  </div>
</template>

<script>
export default {
  props:['toggle']
}
</script>

<style scoped>
.tumbler-filter{
  height: 24px;
  width: 24px;
}
</style>