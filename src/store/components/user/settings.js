import axios from "axios";
import router from "./../../../router";

export default {
        setUser(ctx,data) {
            axios.post('http://libarticle.loc/api/v1/setUser', data).then(res => {
                ctx.commit('updateUser', res.data)
                console.log("user settings",res.data);
                router.push('/')
            }).catch(err => {
                console.log('set user error:',err.response);
                ctx.commit('userMessages', err.response.data)
            })
        },
        updatePrivacy(ctx,data){
            axios.post('http://libarticle.loc/api/v1/change-privary', data).then(res => {
                ctx.commit('updateSettings', res.data)
                console.log("user settings");
            }).catch(err => {
                console.log('set user error:',err.response);
                ctx.commit('userMessages', err.response.data)
            })
        }
}