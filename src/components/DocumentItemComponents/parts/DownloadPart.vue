<template>
  <div class="profile-file-download-link" v-if="type === 'searcher'">
    <span v-if="false">{{article.id}}</span>
    <router-link class="file-download-link" :to="''">
      Завантажити
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3684DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/></svg>
    </router-link>
        <!--            <span v-else>Доступ до файлу закритий</span>-->
  </div>
  <div class="profile-file-download-link" v-if="type === 'profile'">
    <span v-if="false">{{article.id}}</span>
    <router-link class="file-download-link" :to="''">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3684DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/></svg>
    </router-link>
    <!--            <span v-else>Доступ до файлу закритий</span>-->
  </div>
</template>

<script>
export default {
  props:['article', 'type']


}
</script>

<style scoped>

.profile-file-download-link{
  margin-right: 10px;
}

a{
  display: flex;
  text-decoration: none;
  color: #47afec;
}
a > svg{
  margin-left: 3px;
  cursor: pointer;
  stroke: #47afec;
}

</style>