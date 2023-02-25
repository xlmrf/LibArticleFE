<template>
  <div>
    <textarea cols="30" rows="10" class="inp-e document-description-area" v-model="getDocument.description"></textarea>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: ['field'],
  computed: {
    ...mapGetters(['getDocument'])
  },
}
</script>

<style scoped>

</style>