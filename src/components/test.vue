<template>
    <div class="container" style="margin: 20px;border: 1px solid skyblue">
        <div>
            <span>
                <label for="name">email</label>
                <input type="text" name="" id="name" v-model="email" class="input">
            </span>
            <span>
                <label for="pass">password</label>
                <input type="text" name="" id="pass" v-model="password" class="input">
            </span>
            <button @click="enter()" style="padding: 5px 10px; border: 1px solid #313131">enter</button>
            <router-link to="/home" style="padding: 5px 10px; border: 1px solid #313131">home</router-link>

            <div style="border: 1px solid #515151; border-radius: 4px; padding: 10px">
                <h3 style="text-align: center">Information</h3>
                <h4>{{ getInfo }}</h4>
            </div>
        </div>
<!--        <div class="large-12 medium-12 small-12 cell">-->
<!--            <label>Files-->
<!--                <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>-->
<!--            </label>-->
<!--        </div>-->
<!--        <div class="large-12 medium-12 small-12 cell">-->
<!--            <div v-for="(file, key) in files" class="file-listing">{{ file.name }} <span class="remove-file" v-on:click="removeFile( key )">Remove</span></div>-->
<!--        </div>-->
<!--        <br>-->
<!--        <div class="large-12 medium-12 small-12 cell">-->
<!--            <button v-on:click="addFiles()">Add Files</button>-->
<!--        </div>-->
<!--        <br>-->
<!--        <div class="large-12 medium-12 small-12 cell">-->
<!--            <button v-on:click="submitFiles()">Submit</button>-->
<!--        </div>-->
    </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    data(){
        return {
            email: '',
            password: ''

            // files: []
        }
    },
    computed:{
        ...mapGetters(['getInfo']),
        ...mapActions(['testAxios']),
    },

    methods: {
        ...mapMutations(['setInfo']),
        enter(){
            axios.get('/sanctum/csrf-cookie').then(res => {
                axios.post('/login', {email:this.email, password: this.password})
                    .then(r =>{
                        this.setInfo(r.data)
                        console.log("test login",r);
                    }).catch(err=>{
                    console.log(err.response);
                })
            })
        },

        // addFiles(){
        //     this.$refs.files.click();
        // },
        // submitFiles(){
        //
        //     let formData = new FormData();
        //     for( var i = 0; i < this.files.length; i++ ){
        //         let file = this.files[i];
        //         formData.append('files[' + i + ']', file);
        //     }
        //     axios.post( '/select-files',
        //         formData,
        //         {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         }
        //     ).then(function(){
        //         console.log('SUCCESS!!');
        //     })
        //         .catch(function(){
        //             console.log('FAILURE!!');
        //         });
        // },
        // handleFilesUpload(){
        //     let uploadedFiles = this.$refs.files.files;
        //     for( var i = 0; i < uploadedFiles.length; i++ ){
        //         this.files.push( uploadedFiles[i] );
        //     }
        // },
        // removeFile( key ){
        //     this.files.splice( key, 1 );
        // }
    }
}
</script>
<style>

input[type="file"]{
    position: absolute;
    top: -500px;
}
div.file-listing{
    width: 200px;
}
span.remove-file{
    color: red;
    cursor: pointer;
    float: right;
}
</style>
