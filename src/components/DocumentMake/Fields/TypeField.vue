<template>
  <div class="document-types" v-if="getTypes.length > 0">
    <div>
      <h3>Категорії</h3>
      <div class="files-tape">
        <div v-for="(type,key) in getTypes" :key="key"
             :class="['file-name',{'category-active':getTypes?getTypes.find(e => e.id === getDocument.type_id):''}]"
             @click="getDocument.type_id = type.id">{{ type.name }}
        </div>
      </div>
    </div>
    <div class="type-description">
      <h3>Поля для заповнення</h3>
      <ul class="item-category-collection" v-if="getDocument.type_id">
        <li class="manual-item" v-for="(item, key) in getTypes.find(type => type.id === getDocument.type_id)['fields']" :key="key">
          {{ translateAreas(item) }}
        </li>
      </ul>
      <span class="category-not-chosen" v-else>Оберіть категорію</span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  mixins: ['translate'],
  computed: {
    ...mapGetters(['getDocument', 'getTypes']),
    ...mapActions(['requestTypes'])
  },
  mounted() {
    this.requestTypes
  }
}
</script>

<style scoped>
.files-tape {
  float: left;
  width: 300px;
}
</style>