import axios from "axios";
import router from "./../../../router";

export default {
        updatePrivacy(ctx,data){
            axios.post('http://libarticle.loc/api/v1/change-privary', data).then(res => {
                ctx.commit('updateSettings', res.data)
                console.log("user settings");
            }).catch(err => {
                console.log('set user error:',err.response);
                ctx.commit('userNotices', err.response.data)
            })
        }
}