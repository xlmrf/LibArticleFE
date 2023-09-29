<template>
<div>
  <span class="view-frame frame" v-if="getDocument.views.views">{{ this.$store.getters.getLanguage.document.characteristic.views }} <span>{{ getDocument.views.views }}</span></span>
</div>
</template>

<script>

import {mapGetters, mapState} from 'vuex'

export default {

  computed:{
    ...mapGetters(['getDocument'])
  }
}
</script>

<style scoped>

.view-frame{
  display: flex;
}

.view-frame > span{
  font-weight: bold;
  color: #333333;
}

</style>