import axios from "axios";
import router from "@/router";

export default {
    state(){
        return{
            userPhoto:'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2022%2F10%2F26%2Fcan-cats-eat-corn-3-677819443-2000.jpg&q=60',
            altPhoto:'../../../assets/image/user_photos/default_user_icon3.png',
            authorPhoto:'',
        }
    },
    actions:{
        requestAuthorPhoto(ctx){
            let id = router.currentRoute.value.params.id
            axios.get('http://libarticle.loc/api/v1/photo/'+id).then(response => {
                // ctx.commit('updateAuthorPhoto', response.data)
            }).catch(err => {
                console.log(err)
                ctx.commit('updatePhoto', 'not_found')
            })
        },
       async requestUserPhoto(ctx){
            await axios.get('http://libarticle.loc/api/v1/photo').then(response => {
                // ctx.commit('updatePhoto', response.data)
            }).catch(err => {
                console.log(err)
                ctx.commit('updatePhoto', 'not_found')
            })
        },
        newPhoto(ctx,data){
            axios.post('http://libarticle.loc/api/v1/photo').then(response => {
                // ctx.commit('updatePhoto', response.data)
            })
        },
        removePhoto(ctx){
            axios.delete('http://libarticle.loc/api/v1/photo').then(response => {
                // ctx.commit('updatePhoto', response.data)
            })
        }
    },
    mutations:{
        updatePhoto(ctx,data){
            data === 'not_found' ?
                ctx.userPhoto = ctx.altPhoto :
                ctx.userPhoto = ctx.rootState.api_url_v1+'/image/'+data
        },
        // updateAuthorPhoto(ctx,data){
        //     data === 'not_found' ?
        //         ctx.authorPhoto = require(ctx.altPhoto)
        //         :ctx.authorPhoto = ctx.rootState.api_url_v1+'/image/'+data.nameFile
        // }
    },
    getters:{
        getPhoto(ctx){
            return ctx.userPhoto
        },
        getAuthorPhoto(ctx){
            return ctx.authorPhoto
        },
        getAltPhoto(ctx){
            return ctx.altPhoto
        }
    }
}