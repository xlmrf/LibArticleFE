<template>
  <div>
    <div class="publication-date">
      {{getDate(article.publication_date)}}
    </div>
<!--          <div class="publication-date" v-if="type === 'draft'">-->
<!--    &lt;!&ndash;        {{getDate(document.publication_date)}}&ndash;&gt;23.05.22-->
<!--          </div>-->
  </div>
</template>

<script>
export default {
  props:['article'],

  methods:{
    getDate(old_date){
      if (old_date) {
        let date_arr = old_date.split('-')

        const yyyy = date_arr[0]
        let mm = date_arr[1]
        let dd = date_arr[2]

        // if (dd < 10) dd = '0' + dd
        // if (mm < 10) mm = '0' + mm

        return dd + '.' + mm + '.' + yyyy
      }
      return ''
    }
  }

}
</script>

<style scoped>



</style>