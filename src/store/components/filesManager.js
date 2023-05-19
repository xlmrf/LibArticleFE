import axios from "axios";

export default {
    state(){
        return{
            ProgressLoadingFile: 0,
            files:{
                main:{},
                add:[]
            }
        }
    },
    actions:{
        // console.log('files in js -', data); http://s1.libarticle.polidar.in.ua/api/upload-file
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
            if (Object.keys(state.files.main).length === 0){
                state.files.main = data
            }
            else {
                state.files.add.push(data)
            }


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