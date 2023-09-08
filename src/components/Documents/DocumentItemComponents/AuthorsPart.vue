<template>
  <div class="authors" v-if="type !== 'draft'">
      <span class="author-item" v-for="author in article.authors">
        <router-link class="author-item-link" :to="'/profile/'+author.user_id" v-if="author.user_id">
          {{author.last_name}} {{author.first_name?author.first_name[0]:''}}
        </router-link>
        <span v-else>
          {{author.last_name}} {{author.first_name?author.first_name[0]:''}}.
        </span>
      </span>
  </div>
</template>

<script>
export default {
  props:['article', 'type']


}
</script>

<style scoped>

</style>