<template>
    <div class="check-item">
        
        <label class="checkbox-item filter-checkbox select-type-checkbox">
            <input type="checkbox" v-model="checkItem" @change="checkItemM()">
            <span class="label"></span>
        </label>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {apa} from "@/styleLib";

export default {
    props: ['doc'],

    data() {
        return {
            checkItem: false
        }
    },
    watch: {
        '$route.query': {
            handler(item) {

                if (item.refs_doc_id && JSON.parse(item.refs_doc_id).length === 0) {
                    console.log('refssssss', this.getSelectedRefs)
                    this.checkItem = false
                }
            }
        }
    },
    computed: {
        ...mapGetters(['getSelectedRefs', 'getMakeDocument']),

    },
    methods: {
        ...mapMutations(['updateSelectedRefs']),
        catchItem() {
            let idx = this.getSelectedRefs.findIndex(item => item.id === this.doc.id)
            if (idx !== -1) {
                console.log('bad')
                this.getSelectedRefs.splice(idx, 1)
            } else {
                console.log('nice')
                this.getSelectedRefs.push(this.doc)
            }
        },
        checkItemM() {

            let ref_doc_index = this.getMakeDocument.references.findIndex(e => e.reference_document_id === this.doc.id)
            if (this.checkItem) {
                if (ref_doc_index != '-1' && this.getMakeDocument.references[ref_doc_index].id) {
                    this.getMakeDocument.references[ref_doc_index]['delete'] = false;
                } else {
                    this.getMakeDocument.references.push({
                        reference_document_id: this.doc.id,
                        bibliographic_description: apa(this.doc)
                    })
                }
            } else {
                if (this.getMakeDocument.references[ref_doc_index].id) {
                    this.getMakeDocument.references[ref_doc_index]['delete'] = true;
                } else {
                    this.getMakeDocument.references.splice(ref_doc_index, 1);
                }
            }


            // console.log('route:', this.$route.query)
            // let query = Object.assign({}, this.$route.query);
            // this.updateSelectedRefs(query.refs_doc_id !== undefined ? JSON.parse(query.refs_doc_id) : [])
            // console.log('refs:', JSON.parse(this.$route.query.refs_doc_id))

            // this.catchItem()
            //
            // const refs_idx = this.getSelectedRefs.map(item => item.id);
            // this.$router.replace({
            //   name: 'documents',
            //   query: {...query, ...{refs_doc_id:JSON.stringify(refs_idx)}}
            // })
        },
    },
    mounted() {
        let ref_doc = this.getMakeDocument.references.find(e => e.reference_document_id === this.doc.id);
        this.checkItem = ref_doc ? true : false;
        if (ref_doc && ref_doc.delete) {
            this.checkItem = !ref_doc.delete;
        }

        // if ((this.$route.query.refs_doc_id && JSON.parse(this.$route.query.refs_doc_id).length > 0) && JSON.parse(this.$route.query.refs_doc_id).includes(this.doc.id)) {
        //     this.checkItem = !!JSON.parse(this.$route.query.refs_doc_id).includes(this.doc.id)
        // }
    }
}
</script>

<style scoped>

</style>
