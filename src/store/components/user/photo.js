import axios from "axios";
import router from "@/router";

export default {
    state(){
        return{
            userPhoto:'',
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
                ctx.userPhoto = require(ctx.altPhoto)
                :ctx.userPhoto = 'http://192.168.0.102/api/image/'+data
        },
        updateAuthorPhoto(ctx,data){
            data === 'not_found' ?
                ctx.authorPhoto = require(ctx.altPhoto)
                :ctx.authorPhoto = 'http://192.168.0.102/api/image/'+data.nameFile
        }
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