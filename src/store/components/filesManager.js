import axios from "axios";

export default {
    state(){
        return{
            files: [],
            ProgressLoadingFile: 0,
            // files:{
            //     main:{url:''},
            //     add:[{},{}]
            // }
        }
    },
    actions:{
        // console.log('files in js -', data); http://s1.libarticle.polidar.in.ua/api/upload-file
        pushFile(ctx,data){
            axios.post('https://s1.libarticle.polidar.in.ua/api/v1/file', data, {
                onUploadProgress: progressEvent => {
                    if (progressEvent.lengthComputable){
                        ctx.commit('mutateProgressLoadingFile',(progressEvent.loaded / progressEvent.total) * 100)
                    }
                }
            }).then(response => {
                console.log("data response", response.data);
                // add file in store
                ctx.commit('FilePusher',response.data)
            }, error => {
                this.loadError = error
                console.log('error in add files:', error);
            });
        },
        reviseFile(ctx, name){
            axios.get('http://s1.libarticle.loc/api/file'+ name).then(response => {
                console.log('revise file axios',response);



            }).catch(error =>{
                console.log(error.response);
            })
        },
    },
    mutations:{
        mutateProgressLoadingFile(state, data){
            state.ProgressLoadingFile = data
        },
        FilePusher(state, data){
            state.files.push(data)

        },
        updateFiles(state,data){
            state.files = data
        }
    },
    getters:{
        getProgressLoadingFile(ctx){
            return ctx.ProgressLoadingFile
        },
        getFiles(ctx){
            return ctx.files
        },
    }
}