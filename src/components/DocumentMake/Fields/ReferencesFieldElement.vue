<template>

             <div v-text="element.bibliographic_description"
                  :class="[{'italic':element.edit}, {'system-ref': element.reference_document_id}, {'borderC':contenteditable}]"
                  :contenteditable="contenteditable" @click="event => changeText(event, index)" ref="fileInput" style="float: left; width: 95%">
             </div>
    <div style="width: 5%; float: right; text-align: center">
        <div >
            <small @click="contenteditable=!contenteditable, this.$refs.fileInput.click()" class="change-ref-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                 :fill="contenteditable?'blue':'none'" stroke="#9A9A9A"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon
                points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
            </small>
        </div>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
             fill="none"
             stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="draggable-icon handle">
            <line x1="3" y1="3" x2="18" y2="3"></line>
            <line x1="3" y1="12" x2="18" y2="12"></line>
            <line x1="3" y1="21" x2="18" y2="21"></line>
        </svg>
        </div>
        <div>
            <small @click="deleteKeyword(index,element)" class="delete-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </small>
        </div>


    </div>
    <div style="clear: both"></div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'ReferencesFieldElement',
    props: ['element', 'index'],
    data() {
        return {
            invalid: '',
            contenteditable:false
        }
    },

    methods: {

        changeText(e, index) {
            // console.log(e, index);
            this.getMakeDocument.references[index]['bibliographic_description']=e.target.innerText;
        },
        deleteKeyword(idx, reference) {
            console.log("item", idx);
            if (reference.id) {
                this.getMakeDocument.references[idx]['delete'] = true;
            } else {
                this.getMakeDocument.references.splice(idx, 1)
            }
        },
    },
    computed: {
        ...mapGetters(['getMakeDocument'])
    },
}
</script>

<style scoped>
.borderC{
    border: 2px solid blue;
}


.change-ref-title:hover > svg {
    stroke: #1C75DD;
}


.reference-item {
    margin: 6px 2px;
    font-size: 18px;
    padding: 8px 10px;
    border: 1px solid #a1a1a1;
    width: 100%;
}

.complex-item-control > span {
    position: relative;
}

.delete-ref-btn {
    right: 30%;
    top: 25%;
    position: absolute;
}

.italic {
    hyphens: auto;
    font-style: italic;
}

.handle {

}
.handle:hover {
    stroke: #56e046;
}
.system-ref {
    color: #1C75DD;
}

li {
    position: relative;
}

.change-ref-title {
    cursor: pointer;
}

.change-ref-title:hover > svg {
    stroke: #1C75DD;
}

.delete-item {
    height: fit-content;
}

.search-in-system-btn {
    flex: 1;
    position: absolute;
    border-radius: 4px;

    bottom: 140%;

    left: calc(50% - 72px);
    padding: 7px 12px;
    overflow: hidden;
    background: #4694f1;
    text-align: center;
    /*border: 1px solid #444444;*/
    outline: none;
    color: white;
    /*color: #444444;*/
    cursor: pointer;
}
.draggable-icon {
    height: fit-content;
    cursor: row-resize;
}
.search-in-system-btn:hover {
    /*color: white;*/
    background: #5a9cea;
    /*border: 1px solid transparent;*/
}

.add-ref-btn {

}
</style>
