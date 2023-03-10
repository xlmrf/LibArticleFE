<template>
  <div class="user-state-panel item-underline">
    <div class="state-upload">
      <span class="state-count">9</span>
      <span class="sub-name-state">Завантажено документів</span>
    </div>
    <div class="state-citation">
      <span class="state-count">2</span>
      <span class="sub-name-state">Процитовано</span>
    </div>
    <div class="state-views">
      <span class="state-count">277</span>
      <span class="sub-name-state">Переглядів</span>
    </div>



<!-------old------>

<!--    <div class="state-upload">-->
<!--      <span class="sub-name-state">Завантажено документів</span>-->
<!--      <hr />-->
<!--      <span class="state-count">9</span>-->
<!--    </div>-->
<!--    <div class="state-citation">-->
<!--      <span class="sub-name-state">Процитовано</span>-->
<!--      <hr />-->
<!--      <span class="state-count">2</span>-->
<!--    </div>-->
<!--    <div class="state-views">-->
<!--      <span class="sub-name-state">Переглядів</span>-->
<!--      <hr />-->
<!--      <span class="state-count">277</span>-->
<!--    </div>-->


  </div>

</template>

<script>

export default {

  components:{}

}
</script>

<style scoped>
.user-state-panel{
  display: flex;
  flex-flow: row;
  position: relative;
}
.user-state-panel > div{
  /*border:  1px solid red;*/
  height: auto;
  margin: 0.5rem;
  display: inherit;
  flex-flow: column;
  align-items: center;
}
.state-count{
  font-size: 28px;
  color: #525252;
  margin: 0.5rem;
  flex: 3;
}
.sub-name-state{
  white-space: nowrap;
  margin: 0.5rem;
  font-size: 0.9em;
  color: #2a2a2a;
}



/*.state-count{*/
/*  color: #525252;*/
/*  margin: 0.5rem;*/
/*}*/
/*hr {*/
/*  display: block;*/
/*  height: 1px;*/
/*  border: 0;*/
/*  border-top: 1px solid #ccc;*/
/*  margin: 1em 0;*/
/*  padding: 0;*/
/*  width: 100%;*/
/*}*/
</style>