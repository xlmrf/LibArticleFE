<template>
  {{format(item)}}
</template>

<script>
import * as styleLib from '../../styleLib.js'
export default {
  props: ['item','style'],
  methods: {
    format(item, style = null){
      return styleLib.apa(item)
    }
  }

}
</script>

<style scoped>

</style>