import {createStore} from 'vuex'
import article from './components/document'
import user from './components/user/user'
import searcher from "./components/searcher"
import loader from "./components/loader"
import comment from "./components/comment"
import library from "./components/documents"
import authorization from './components/user/auth'
import filesManager from './components/filesManager'
import CodeMessages from "./components/CodeMessages"
import langLabels from "./components/langLabels";
import photo from './components/user/photo'
import actions from "@/store/components/actions";
import notices from "@/store/components/user/notices";

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
        CodeMessages,
        langLabels,
        actions,
        notices,


    },
    state: {
        message: {},
        api_url_v1:'https://libarticle.polidar.in.ua/api/v1',
        server_url_v1:'https://s1.libarticle.polidar.in.ua/api/v1',
        access_file_types: {
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'pdf':'application/pdf',
            'doc':'application/msword',
            'pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'txt':'text/plain'
        },
        types:[],
        DocumentItemTypes:{
            drafts: 'drafts',
            searcher: 'searcher',
            profile: 'profile'
        },
        lang: localStorage.getItem('lang'),

        TypesColor:{
            'Стаття': 'violet',
            'Тезис': 'aqua',
            'Конспект': 'grass',
            'Дисертація': 'red',
            'Підручник': 'blue',
            'Монографія': 'yellow'
        }
    },
    mutations: {
        pageMessage(ctx, data) {
            ctx.message = data
        },
        changeLang(ctx, data){
            ctx.lang = data
        },
        updateTypes(ctx,data){
            ctx.types = data
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
        },
        getTypes(ctx){
            return ctx.types
        },
        getLanguage(ctx){
            if (ctx.lang === 'ua'){
                return ctx.langLabels.ua
            }
            else {
                return ctx.langLabels.en
            }
        },
        getTypesColor(ctx){
            return ctx.TypesColor
        }
    }
})
