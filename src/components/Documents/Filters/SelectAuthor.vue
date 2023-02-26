<template>
  <div class="author-filter">
    <span class="filter-title authors-title-filter" @click="AuthorsFilterOpen = !AuthorsFilterOpen">
      Authors
    </span>
    <div :class="['filter-area',{filter_open:AuthorsFilterOpen}]" v-if="getAuthors.data">
      <label class="save-session" v-for="(author,idx) in chosen">
        <input type="checkbox" :value="author" v-model="chosen" id="test">
        <span class="label">{{ author.first_name }} {{ author.last_name }}</span>
      </label>
      <input type="text" v-model="search">
      {{ chosen }}
      <label class="save-session" v-for="(author,idx) in getAuthors.data.filter(item=>chosen.find(i=>i===item)?false:true)" >
        <input type="checkbox" :value="author" v-model="chosen" id="test">
        <span class="label">{{ author.first_name }} {{ author.last_name }}</span>
      </label>


    </div>


    <!--    <select v-model="getDocument.year">-->
    <!--      <option v-for=" in years" :key="y">-->
    <!--        {{ y }}-->
    <!--      </option>-->
    <!--    </select>-->

    <!--    <form>-->
    <!--      <div class="multiselect">-->
    <!--        <div class="selectBox" @click="expanded = !expanded">-->
    <!--          <select>-->
    <!--            <option>Select an option</option>-->
    <!--          </select>-->
    <!--          <div class="overSelect"></div>-->
    <!--        </div>-->
    <!--        <div id="checkboxes">-->
    <!--          <label for="one">-->
    <!--            <input type="checkbox" id="one" />First checkbox</label>-->
    <!--          <label for="two">-->
    <!--            <input type="checkbox" id="two" />Second checkbox</label>-->
    <!--          <label for="three">-->
    <!--            <input type="checkbox" id="three" />Third checkbox</label>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </form>-->

    <!--    <input type="text" list="cars" />-->
    <!--    <datalist id="cars">-->
    <!--      <label for="one">-->
    <!--        <input type="checkbox" id="one" />First checkbox</label>-->
    <!--              <input type="checkbox" id="three" />-->
    <!--            </datalist>-->
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {

  data() {
    return {
      AuthorsFilterOpen: false,
      chosen: [],
      search: '',
      authors: [
        {
          id: 7,
          first_name: 'Pavel',
          last_name: 'Durov',
        },
        {
          id: 9,
          first_name: 'Julius',
          last_name: 'Caesar'
        },
        {
          id: 22,
          first_name: 'Nicola',
          last_name: 'Tesla'
        }
      ],
      expanded: false
    }
  },
  watch: {
    '$route.query.q': {
      handler(){
        this.findAuthor();
      }
    },
    '$route.query.publication_date': {
      handler(){
        this.findAuthor();
      }
    }
    ,
    search() {
      // this.findAuthor

      this.findAuthor()

      // let q = Object.entries(this.$route.query).join('&').split(',').join('=')
      // let link = '?'+ (q ?q+'&': '');
      // link += "authors="+this.search
      //
      // this.AuthorsFilter(link)
    },
    // <!--    /authors?q=Test&authors[0]['lastname']=Morozov&authors[0]['first']=PAvel-->
    chosen() {

      const {...query} = this.$route.query;
      delete query.page;

      Object.keys(query).forEach(function (key) {
        if (key.indexOf('authors') !== -1) {
          delete query[key];
        }
      })

      let authors = {};
      this.chosen.forEach((item, key) => {
        authors[`authors[${key}][last_name]`] = item.last_name;
        authors[`authors[${key}][first_name]`] = item.first_name;
      })
      this.$router.replace({
        name: 'documents',
        query: {...query, ...authors}
      })

    }
  },
  computed: {
    ...mapGetters(['getAuthors']),

  },
  methods: {
    ...mapActions(['AuthorsFilter']),
    selectAuthor(author, i) {
      console.log(i)
      // this.search.push(author)
    },
    findAuthor() {
      let q = Object.entries(this.$route.query).join('&').split(',').join('=')
      let link = q ? '?' + q : '';//'?' + (q ? q + '&' : '');
      if (this.search !== '') {
        link += link ? "&authors=" + this.search : "&authors=" + this.search
      }
      return this.AuthorsFilter(link)

    }
    //   showCheckboxes(){
    //   var checkboxes = document.getElementById("checkboxes");
    //   if (!expanded) {
    //     checkboxes.style.display = "block";
    //     expanded = true;
    //   } else {
    //     checkboxes.style.display = "none";
    //     expanded = false;
    //   }
    // }
  },
  mounted() {

    const {...query} = this.$route.query;

    // this.chosen = [{"last_name": "Zhuk", "first_name": "Serhii"}]


    Object.keys(query).forEach((key) => {
      if (key.indexOf('authors') !== -1) {
        let index = parseInt(key.match(/\d+/));
        if (this.chosen[index] === undefined) {
          this.chosen[index] = {};
        }
        if (key.indexOf('last_name') !== -1) {
          this.chosen[index]['last_name'] = query[key];
        }
        if (key.indexOf('first_name') !== -1) {
          this.chosen[index]['first_name'] = query[key];

        }
      }
    })

    // console.log();
    // let query = this.$route.query;
    // console.log(query);
    // delete query.page;
    // delete query.authors;
    // // Object.keys(query).forEach(function (key, index) {
    // //   if (key.indexOf('authors') !== '-1') {
    // //     delete query[key];
    // //   }
    // // })
    // // delete query.authors[0];
    // // delete query['authors[*][first_name]'];
    // console.log(query);

    // let query = Object.assign({}, this.$route.query);
    // console.log('author query:',this.$route.query)
    // this.chosen = [{
    //   first_name: 'Igor3',
    //   last_name: 'Special'
    // }]
    this.findAuthor()
  }
}
</script>

<style scoped>

.author-filter {
  border: 1px solid darkslateblue;
}

.multiselect {
  width: 200px;
}

.selectBox {
  position: relative;
}

.selectBox select {
  width: 100%;
  font-weight: bold;
}

.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#checkboxes {
  display: none;
  border: 1px #dadada solid;
}

#checkboxes label {
  display: block;
}

#checkboxes label:hover {
  background-color: #1e90ff;
}

.hides {
  display: none;
}
</style>