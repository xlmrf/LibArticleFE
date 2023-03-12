<template>
  <div class="author-filter">
    <span class="filter-title authors-title-filter" @click="AuthorsFilterOpen = !AuthorsFilterOpen">
      Автори <tumbler-filter-button :toggle="AuthorsFilterOpen"/>
    </span>
    <div :class="['filter-area',{filter_open:AuthorsFilterOpen}]" v-if="getAuthors.data">
      <input type="text" v-model="search">
      <label class="save-session filter-checkbox" v-for="(author,idx) in getAuthors.data" >
        <input type="checkbox" :value="author" v-model="chosen" id="test">
        <span class="label">{{ author.first_name }} {{ author.last_name }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TumblerFilterButton from "@/components/additional/TumblerFilterButton";

export default {
  components: {TumblerFilterButton},
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
      },
    },
    '$route.query.type_id': {
      handler() {
        this.findAuthor();
      }
    },
    '$route.query.authors': {
      handler(key) {
        if (key !== undefined)
          this.chosen = JSON.parse(key);
        else
          this.chosen=[]
      }
    },
    search(){
      this.findAuthor();
    },
    chosen() {

      const {...query} = this.$route.query;
      delete query.page;
      delete query.authors;

      let authors = {};
      if(this.chosen.length!==0){
        authors = {authors:JSON.stringify(this.chosen)};
      }

      this.$router.replace({
        name: 'documents',
        query: {...query, ...authors}
      })

      // this.findAuthor()

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
      const {...query} = this.$route.query;
      delete query.page;
      // delete query.authors;
      // Object.keys(query).forEach(function (key) {
      //   if (key.indexOf('authors') !== -1) {
      //     delete query[key];
      //   }
      // })

      let q = '';
      if (this.$route.fullPath.split("?")[1] !== undefined)
        q = this.$route.fullPath.split("?")[1]
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

    this.findAuthor()
  }
}
</script>

<style scoped>

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
