<template>
<!--  <div>-->
<!--    <input type="text" name="" id="" v-model="getDocument.type">-->
<!--  </div>-->

  <div class="document-types">
    <div>
      <h3>Категорії</h3>
      <div class="files-tape">
        <div v-for="(category,key) in getCategories"
             :class="['file-name',{'category-active':getDocument.category ? getDocument.category.id === category.id: ''}]"
             @click="getDocument.category = category">{{category.name}}</div>
      </div>
    </div>
    <div class="type-description">
      <h3>Поля для заповнення</h3>
      <ul class="item-category-collection" v-if="getDocument.category">
        <li class="manual-item" v-for="item in getCategories[getDocument.category.id-1]['fields']">
          {{translateAreas(item)}}</li>
      </ul>
      <span class="category-not-chosen" v-else>Оберіть категорію</span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  mixins:['translate'],
  computed: {
    ...mapGetters(['getDocument','getCategories']),
    ...mapActions(['requestCategories'])
  },
  mounted() {
    this.requestCategories
  }
}
</script>

<style scoped>

</style>