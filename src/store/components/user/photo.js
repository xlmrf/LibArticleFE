import axios from "axios";
import router from "@/router";

export default {
    state(){
        return{
            anonPhoto:'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2022%2F10%2F26%2Fcan-cats-eat-corn-3-677819443-2000.jpg&q=60',
            userPhoto:'',
            tempPhoto:{
                image:'',
                progress:0,
                checkLoad:false
            }
        }
    },
    actions:{
        // requestAuthorPhoto(ctx,id){
        //     axios.get(ctx.rootState.server_url_v1+'/photo/'+id).then(response => {
        //         ctx.commit('updatePhoto', response.data)
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // },

    },
    mutations:{
        updatePhoto(ctx,data){
            ctx.tempPhoto.image = data

        },
        userPhoto(ctx,data){
            ctx.userPhoto = data
        }
        // updateAuthorPhoto(ctx,data){
        //     data === 'not_found' ?
        //         ctx.authorPhoto = require(ctx.altPhoto)
        //         :ctx.authorPhoto = ctx.rootState.api_url_v1+'/image/'+data.nameFile
        // }
    },
    getters:{
        getPhoto(ctx){
            return ctx.userPhoto ? ctx.userPhoto : ctx.anonPhoto
        },
        getAnonPhoto(ctx){
            return ctx.anonPhoto
        },
        getTempPhoto(ctx){
            return ctx.tempPhoto
        }
    }
}