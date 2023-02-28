<template>
  <div>
    <table>
      <tr><td>Title</td><td><input type="text" name="title" id="title">{{getDocument.title}}</td></tr>
      <tr><td>Edition</td><td>{{getDocument.edition}}</td></tr>
      <tr><td>Authors</td><td><span v-for="author in getDocument.authors">{{author.last_name}} </span></td></tr>
      <tr><td>Publication</td><td>{{getDocument.publication}}</td></tr>
      <tr><td>Keywords</td><td><span v-for="word in getDocument.keywords">{{word}}</span></td></tr>
      <tr><td>Publication date</td><td>{{getDocument.publication_date}}</td></tr>
      <tr><td>Links</td><td><span v-for="link in getDocument.links">{{link}}</span></td></tr>
      <tr><td>Description</td><td>{{getDocument.description}}</td></tr>
    </table>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>