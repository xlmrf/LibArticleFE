<template>
  <div class="doc-list-item references-block">
    <h3 class="top-ref-block" @click="hide_refs = !hide_refs">Посилання данного файла <tumbler-filter-button :toggle="!hide_refs"/></h3>
    <div :class="{'display-none':hide_refs}">
      <div class="item-reference item-underline" v-for="(reference,idx) in getDocument.references">
        <span class="ref-body">{{idx+1}}. {{reference.bibliographic_description}}</span>
        <div class="ref-bottom">
          <span @click="copy(reference.bibliographic_description,idx)" class="ref-copy-area">
            <span v-if="copy_idx !== idx">копіювати</span>
            <span v-else>скопійовано</span>
            <svg xmlns="http://www.w3.org/2000/svg" v-if="copy_idx === idx" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TumblerFilterButton from "@/components/additional/TumblerFilterButton";
export default {
  components: {TumblerFilterButton},
  props:['getDocument'],

  data(){
    return{
      copy_idx:-1,
      hide_refs: true
    }
  },
  methods:{
    async copy(text,idx){
      this.copy_idx = idx
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    },
  }

}
</script>

<style scoped>

.item-reference{
  margin-top: 15px;
  padding-bottom: 10px;
}

.references-block{
  margin: 10px 0;
}
.references-block > div{
  margin: 10px 0;
  padding: 10px;
}

.ref-bottom{
  display: flex;
}
.ref-bottom > span{
  /*color: #0969DA;*/
  cursor: pointer;
}


.ref-copy-area{
  display: flex;
  margin: 10px 2rem 0 auto;
  border: 1px solid #bbb;
  padding: 5px 10px;
  border-radius: 4px;
  align-self: center;
  color: #535353;
}

.ref-copy-area > svg{
  margin-left: 10px;
}

.ref-copy-area:hover{
  /*text-decoration: underline #535353;*/
  color: #222222;
}

.top-ref-block{
  display: flex;
  cursor: pointer;
  align-items: center;
}

.refs-field-none{
  display: none;
}
</style>