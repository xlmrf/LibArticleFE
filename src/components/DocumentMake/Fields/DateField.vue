<template>
  <div class="date-format-block">
    <span @click="this.$refs.full_date.click()" :class="{active_date_format:formatDate==='date'}">
      повна дата <input type="radio" v-model="formatDate" ref="full_date" value="date">
    </span>
    <span @click="this.$refs.only_year.click()" :class="{active_date_format:formatDate==='year'}">
      рік
      <input type="radio" v-model="formatDate" ref="only_year" value="year">
    </span>
    <span @click="this.$refs.none_date.click()" :class="{active_date_format:formatDate==='null'}">
      без дати <input type="radio" v-model="formatDate" ref="none_date" value="null">
    </span>
  </div>

  <div class="date-picker" v-if="formatDate==='date'||formatDate==='year'">
    <div>
      <label>Рік</label>
      <br/>
      <select v-model="year">
        <option v-for="y in years" :key="y">
          {{ y }}
        </option>
      </select>
    </div>
    <div v-if="formatDate==='date'">
      <label>Місяць</label>
      <br/>
      <select v-model="month">
        <option v-for="m in 12" :key="m" :value="String(m).length>1?m:'0'+m">
          {{ m }}
        </option>
      </select>
    </div>
    <div v-if="formatDate==='date'">
      <label>День</label>
      <br/>
      <select v-model="day">
        <option v-for="d in maxDate" :key="d" :value="String(d).length>1?d:'0'+d">
          {{ d }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  name: "publication_date",

  props:['isReady'],
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
      console.log(new Date(year, month, day).toString())
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
  display: flex;
}

.date-format-block > span{
  cursor: pointer;
  padding: 5px 10px;
  margin: 10px 5px 10px 0;

  border: 1px solid #bbb;
  border-radius: 6px;
}

.active_date_format{
  /*background: rgba(9, 127, 218, 0.95);*/
  background: #dedede;
  /*background: #E3F1F9;*/
  /*color: white;*/
}

.date-format-block input{
  display: none;
}

.date-picker {
  display: flex;
}
.date-picker > div{
  display: inherit;
  flex-flow: column;
  margin-right: 0.5rem;
}

.date-picker select{
  border: 1px solid #bbb;
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
}


</style>