import {createStore} from 'vuex'
import article from './components/document'
import user from './components/user/user'
import searcher from "./components/searcher"
import loader from "./components/loader"
import comment from "./components/comment"
import library from "./components/library"
import authorization from './components/user/auth'
import filesManager from './components/filesManager'
import photo from './components/user/photo'

import router from "../router";

export default createStore({
    modules: {
        article,
        user,
        searcher,
        loader,
        comment,
        library,
        authorization,
        filesManager,
        photo,
    },
    state: {
        message: {},
         api_url_v1:'https://libarticle.polidar.in.ua/api/v1'
       // api_url_v1:'http://lib.loc/api/v1'
    },
    mutations: {
        pageMessage(ctx, data) {
            ctx.message = data
        },

        makeErrors(ctx, data) {

            if (data.response.status === 401) {
                localStorage.removeItem('access_token')
                router.push('/login')
            }
        }

    },
    getters: {
        getPageMessage(ctx) {
            return ctx.message
        }
    }
})
