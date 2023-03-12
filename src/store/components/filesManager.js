import axios from "axios";

export default {
    state(){
        return{
            files: [],
            progress: 0,
        }
    },
    actions:{
        // console.log('files in js -', data); http://s1.libarticle.polidar.in.ua/api/upload-file
        pushFile(ctx,data){
            axios.post('https://s1.libarticle.polidar.in.ua/api/v1/file', data, {
                onUploadProgress: progressEvent => {
                    if (progressEvent.lengthComputable){
                        ctx.commit('updateProgress',(progressEvent.loaded / progressEvent.total) * 100)
                        // console.log('progress:',ctx.progress);
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
        updateProgress(state, data){
            state.progress = data
            console.log('mutation process:', data)
        },
        FilePusher(state, data){
            state.files.push(data)
            let file = {
                id:data.id,
                nameFile:data.nameFile,
                url:data.url,
                originalNameFile:data.originalNameFile,
                sizeFile:data.sizeFile
            }
            let document = JSON.parse(localStorage.getItem('not_finished_document'))
            if (!document['files']){
                document['files'] = []
            }
            document['files'].push(file)

            localStorage.setItem('not_finished_document',JSON.stringify(document))

            console.log(document)
        },
        updateFiles(state,data){
            state.files = data
        },
        FileRemover(state, idx){
            console.log(idx);
            let document = JSON.parse(localStorage.getItem('not_finished_document'))
            document['files'].splice(idx,1)
            localStorage.setItem('not_finished_document',JSON.stringify(document))
        }
    },
    getters:{
        getProgress(ctx){
            return ctx.progress
        },
        getFiles(ctx){
            return ctx.files
        },
    }
}