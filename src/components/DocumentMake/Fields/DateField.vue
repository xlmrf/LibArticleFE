<!--<template>-->
<!--  <div>-->
<!--    <input type="date" name="" id="" v-model="getDocument.year">-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {mapGetters} from "vuex";-->

<!--export default {-->

<!--  computed:{-->
<!--    ...mapGetters(['getDocument'])-->
<!--  },-->
<!--  methods:{-->

<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
<div id="date-picker">
<div>
  <label>year</label>
  <br />
  <select v-model="year">
    <option v-for="y in years" :key="y">
      {{ y }}
    </option>
  </select>
</div>
<div>
  <label>month</label>
  <br />
  <select v-model="month">
    <option v-for="m in 12" :key="m" :value="String(m).length>1?m-1:'0'+m">
      {{ m }}
    </option>
  </select>
</div>
<div>
  <label>day</label>
  <br />
  <select v-model="day">
    <option v-for="d in maxDate" :key="d">
      {{ d }}
    </option>
  </select>
</div>
  <input type="checkbox" :value="dateExist" @change="CheckDate">
</div>
</template>

<script>
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  name: "DatePicker",
  props: {
    modelValue: Date,
  },
  data() {
    return {
      dateExist:true,
      years: [],
      year: new Date().getFullYear(),
      month: 0,
      day: 1
    };
  },
  methods: {
    CheckDate(){
      if (!this.dateExist){
        this.getDocument.publication_date = null
      }
      else{
        this.getDocument.publication_date = `${this.year}-${this.month}-${this.day}`
      }
    },
    emitDate() {
      const { year, month, day } = this;
      this.getDocument.publication_date = `${this.year}-${this.month}-${this.day}`

      console.log(new Date(year, month, day).toString())
    }
  },
  watch: {
    year(){
      this.emitDate();
    },
    month(){
      this.emitDate();
    },
    day(){
      this.emitDate();
    }
  },
  computed: {
    ...mapGetters(['getDocument']),
    maxDate() {
      const { month } = this;
      if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
        return 31;
      } else if ([3, 5, 8, 10].includes(month)) {
        return 30;
      }
      return 28;
    },
  },
  mounted() {
    this.emitDate();
  },
  beforeMount() {
    const currentYear = new Date().getFullYear();
    for (let i = -100; i <= 0; i++) {
      this.years.push(currentYear + i);
    }
    const d = moment(this.modelValue);
    this.year = +d.format("YYYY");
    this.month = +d.format("MM") - 1;
    this.day = +d.format("DD");
  },
};
</script>


<style scoped>
#date-picker {
  display: flex;
}#date-picker div {
   margin-right: 10px;
 }
</style>