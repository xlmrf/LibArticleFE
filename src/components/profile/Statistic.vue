<template>
  <div class="user-state-panel">
    <div class="state-upload">
      <span class="sub-name-state">Завантажено документів</span>
      <hr />
      <span class="state-count">9</span>
    </div>
    <div class="state-citation">
      <span class="sub-name-state">Процитовано</span>
      <hr />
      <span class="state-count">2</span>
    </div>
    <div class="state-views">
      <span class="sub-name-state">Переглядів</span>
      <hr />
      <span class="state-count">277</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.user-state-panel{
  display: flex;
  flex-flow: column;
}
.user-state-panel > div{
  display: inherit;

  align-items: center;
}
.state-count{
  color: #525252;
  margin: 0.5rem;
}
.sub-name-state{
  white-space: nowrap;
  margin: 0.5rem;
  font-size: 0.9em;
  color: #2a2a2a;
}
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
  width: 100%;
}
</style>