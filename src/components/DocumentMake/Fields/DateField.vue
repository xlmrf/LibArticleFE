<template>
  <div class="date-format-block">
    <span @click="this.$refs.full_date.click()" :class="{active_date_format:formatDate==='date'}">
      {{ this.$store.getters.getLanguage.document_make.signs.full_date}} <input type="radio" v-model="formatDate" ref="full_date" value="date">
    </span>
    <span @click="this.$refs.only_year.click()" :class="{active_date_format:formatDate==='year'}">
      {{ this.$store.getters.getLanguage.document_make.signs.only_year}}
      <input type="radio" v-model="formatDate" ref="only_year" value="year">
    </span>
    <span @click="this.$refs.none_date.click()" :class="{active_date_format:formatDate==='null'}">
      {{ this.$store.getters.getLanguage.document_make.signs.none_date}} <input type="radio" v-model="formatDate" ref="none_date" value="null">
    </span>
  </div>

  <div class="date-picker" v-if="formatDate==='date'||formatDate==='year'">
    <div>
      <label>{{ this.$store.getters.getLanguage.document_make.signs.year}}</label>
      <br/>
      <select v-model="year">
        <option v-for="y in years" :key="y">
          {{ y }}
        </option>
      </select>
    </div>
    <div v-if="formatDate==='date'">
      <label>{{ this.$store.getters.getLanguage.document_make.signs.month}}</label>
      <br/>
      <select v-model="month">
        <option v-for="m in 12" :key="m" :value="String(m).length>1?m:'0'+m">
          {{ m }}
        </option>
      </select>
    </div>
    <div v-if="formatDate==='date'">
      <label>{{ this.$store.getters.getLanguage.document_make.signs.day}}</label>
      <br/>
      <select v-model="day">
        <option v-for="d in maxDate" :key="d" :value="String(d).length>1?d:'0'+d">
          {{ d }}
        </option>
      </select>
    </div>
    <div class="native-date">
    {{new Date(Date.parse(getDocument.publication_date)).toDateString()}}
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  name: "publication_date",

  props:['isReady', 'field'],
  emits:['catchValidate'],
  data() {
    return {
      formatDate: 'date',
      valid: false,
      dateExist: true,
      years: [],
      year: new Date().getFullYear(),
      month: 0,
      day: 1
    };
  },
  methods: {
    // CheckDate(){
    //   if (this.dateExist){
    //     this.getDocument.publication_date = null
    //   }
    //   else{
    //     this.getDocument.publication_date = `${this.year}-${this.month}-${this.day}`
    //   }
    // },
    emitDate() {
      const {year, month, day} = this;
      this.getDocument.publication_date = `${year}-${month}-${day}`
      if (this.formatDate === 'year'){
        this.getDocument.publication_date = `${year}`
      }
      // console.log(new Date(year, month, day).toString())
    }
  },
  watch: {
    formatDate() {
      if (this.formatDate === 'date') {
        this.getDocument.publication_date = `${this.year}-${this.month}-${this.day}`
      } else if (this.formatDate === 'year') {
        this.getDocument.publication_date = `${this.year}-01-01`
      } else {
        this.getDocument.publication_date = null
      }
    },
    year() {
      this.emitDate();
    },
    month() {
      this.emitDate();
    },
    day() {
      this.emitDate();
    }
  },
  computed: {
    ...mapGetters(['getDocument']),
    maxDate() {
      const {month} = this;
      if (['01', '03', '05', '07', '08', '10', '12'].includes(month)) {
        return 31;
      } else if (['04', '06', '09', '11'].includes(month)) {
        return 30;
      }
      return 28;
    },
  },
  mounted() {

    this.dateExist = !this.getDocument.publication_date;

    const currentYear = new Date().getFullYear();
    for (let i = -100; i <= 0; i++) {
      this.years.push(currentYear + i);
    }

    const d = moment(this.getDocument.publication_date || new Date());
    this.year = d.format("YYYY");
    this.month = d.format("MM");
    console.log(this.month);
    this.day = d.format("DD");
    console.log(this.day);

    this.emitDate();
  }
};
</script>


<style scoped>

.date-format-block{
  position: absolute;
  right: 0;
  top: 0;
  display: flex;

}

.date-format-block > span{
  position: relative;
  cursor: pointer;
  padding: 9px 15px;
  margin-right: 1px;
  /*margin: 10px 5px 10px 0;*/

  /*border: 1px solid #bbb;*/
  border-radius: 3px;
}


.active_date_format:after{
  content: '';
  background: #5a9cea;
  height: 4px;
  width: 80%;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;

  position:absolute;
  /*margin-left: 15px;*/
  bottom:0;
  left: 11%;
}
/*.date-format-block > span:last-child:after{*/
/*  content: '';*/
/*  background: transparent;*/
/*  height: 70%;*/
/*  width: 2px;*/

/*  position:absolute;*/
/*  margin-left: 14px;*/
/*  bottom:5px;*/
/*}*/
.date-format-block > span:hover{
  background: rgba(205, 205, 205, 0.28);
}


/*.active_date_format{*/
/*  !*background: rgba(9, 127, 218, 0.95);*!*/
/*  background: #dedede;*/
/*  !*background: #E3F1F9;*!*/
/*  !*color: white;*!*/
/*}*/

.date-format-block input{
  display: none;
}

.date-picker {
  display: flex;
  margin-left: 1.2rem;
}
.date-picker label{
  text-align: center;
  margin-right: 5px;
}
.date-picker > div{
  display: inherit;
  flex-flow: column;
  margin-right: 1rem;
}

.date-picker select{
  border-bottom: 1px solid #bbb;
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
}

.native-date{
  position: relative;
  margin: auto;
  right: 1rem;
}


</style>