<template>
  <div>
    <h3>Working on it</h3>
    <div class="setting-block hidden-account">
<!--      <div>-->
<!--        <label class="save-session">-->
<!--          <input type="checkbox" name="save-user" v-model="data.session" id="save-user">-->
<!--          <span class="label">Закритий акаунт</span>-->
<!--        </label>-->
<!--        <span>При включені цієї опції, інформація у вашому профілі буде прихована, окрім вашого ПІБ та статусу</span>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import styleFormat from "../additional/CitationStyle"
export default {

  data(){
    return{
      data:{
        session:false
      }
    }
  },

  components:{styleFormat}
}
</script>

<style scoped>
h3{
  text-align: center;
}

.hidden-account{
  padding: 5px;

  background: rgba(241, 241, 241, 0.52);
  /*border: 1px solid silver;*/
  border-radius: 4px;
  color: #333333;
}

.hidden-account > span{
  margin-top: 10px;
  border-radius: 4px;
  /*padding: 5px;*/
  /*border: 1px solid #535353;*/
}


.save-session>input{
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.save-session>span{
  display: inline-flex;
  align-items: center;
  user-select: none;
  font-size: 16px;
}

.save-session>span::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.save-session>input:not(:disabled):not(:checked)+span:hover::before {
  border-color: #4E5477;
}
.save-session>input:checked+span::before {
  border-color: #1059FF;
  background-color: #1059FF;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
</style>
