<template>
  <div>
    <p>Популярні напрямки</p>
    <span></span>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data(){
    return{

    }
  },
  methods:{
    getReportDocCounts(){
      // axios.get(this.rootState.api_url_v1 + '/document-types')
    }
  },
  computed:{
    ...mapGetters(['getRouteV1'])
  },
  mounted() {
    console.log(this.getRouteV1)
    // this.getReportDocCounts()
  }
}
</script>

<style scoped>

</style>