<template>
  <div class="doc-list-item references-block">
    <h2 class="top-ref-block" @click="hide_refs = !hide_refs">посилання данного файла <tumbler-filter-button :toggle="!hide_refs"/></h2>
    <div :class="{'refs-field-none':hide_refs}">
      <div class="item-underline item-reference" v-for="(reference,idx) in getDocument.references">
        <span class="ref-body">{{idx+1}}. {{reference.bibliographic_description}}</span>
        <div class="ref-bottom">
          <span @click="copy(reference.bibliographic_description)" class="ref-copy-area">
            скопіювати
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
      hide_refs: true
    }
  },

  methods:{
    async copy(text){
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
  align-self: center;
  border-bottom: 1px solid transparent;
  color: #535353;
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