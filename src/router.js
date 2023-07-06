import {createWebHistory, createRouter} from "vue-router";
import main from "./components/main"
import info from "./components/info"
import index from "./components/index";
import confirmReg from "./components/auth/confirmReg";
import login from "./components/auth/login"
import recovery from "./components/auth/recovery"
import registration from "./components/auth/registration"
import confirmNewPass from "./components/auth/confirmNewPass";

import documents from "./view/Documents";
import document from "./view/Document"
import profile from "./view/Profile"
import Auth from "./view/Auth"

import tutorial from "./components/fallback/TutorialComponent"
import support from "./view/UnknownPage"
import rules from "./view/UnknownPage"

import actions from "./view/Actions"
import notices from "./components/actions/Notices"
import story from "./components/actions/StoryActions"

import settings from "./view/UserSettings"
import ProfileSettings from "./components/settings/Account"
import Privacy from "./components/settings/Privacy"
import Security from "./components/settings/Security"
import Advanced from "./components/settings/Advanced"

import DocumentMake from "@/view/DocumentMake";
import UnknownPage from "@/view/UnknownPage"


import confirmEmail from "./components/auth/old/ConfirmEmail";

const routes = [
    {
        path: '/index',
        redirect:'/login',
        name: 'index',
        component: index
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
        children:[
            {
                path: '/login',
                name: 'login',
                component: login
            },
            {
                path: '/recovery-password',
                name: 'recovery',
                component: recovery
            },
            {
                path: "/confirm-password",
                name: 'confirmNewPass',
                component: confirmNewPass
            },
            {
                path: '/registration',
                name: 'registration',
                component: registration
            },
            {
                path: '/confirm-registration',
                name: 'confirmReg',
                component: confirmReg
            },

        ]
    },
    {
        path:'/',
        name:'main',
        component: main,
        children: [

            {
                path: '/:any(.*)',
                name: 'not-found',
                component: UnknownPage
            },
            {
                path:'/',
                name:'stat',
                component: info

            },
            {
                path:'/document/make/:id?',
                name:'DocumentMake',
                component: DocumentMake
            },
            // {
            //     path:'/new_document/rename/:id',
            //     name:'RenameDocument',
            //     component: NewDocument
            // },
            {
                path:'/documents',
                name:'documents',
                component: documents
            },
            {
                path:'/my-documents',
                name:'my-documents',
                component: documents
            },
            {
                path:'/document/:id',
                name:'document',
                component: document
            },
            {
                path:'/profile/:id',
                name:'profile',
                component: profile,
                // children:[
                //     {
                //         path:'/statistics',
                //         name:'profile-statistic',
                //         component: profileStatistic
                //     },
                //     {
                //         path:'/folders',
                //         name:'folders',
                //         component: folders
                //     }
                // ]
            },
            {
                path:'/tutorial',
                name:'tutorial',
                component: tutorial
            },
            {
                path:'/support',
                name:'support',
                component: support
            },
            {
                path:'/rules',
                name:'rules',
                component: rules
            },
            {
                path:'/actions',
                name:'actions',
                // redirect:{name:'actions.notices'},
                component: actions,
                children:[
                    {
                        path:'notices',
                        name:'actions.notices',
                        component: notices
                    },
                    {
                        path:'/story',
                        name:'actions.story',
                        component: story
                    }
                ]
            },
            {
                path:'/settings',
                name:'settings',
                redirect:{name:'settings.profile'},
                component: settings,
                children:[
                    {
                        path:'profile',
                        name:'settings.profile',
                        component: ProfileSettings
                    },
                    {
                        path:'privacy',
                        name:'settings.privacy',
                        component: Privacy
                    },
                    {
                        path:'advanced',
                        name:'settings.advanced',
                        component: Advanced
                    },
                    {
                        path:'security',
                        name:'settings.security',
                        component: Security
                    }
                ]
            }


        ]
    },
    // {
    //     path: "/",
    //     name: 'verify',
    //     component: verify
    // },
    // {
    //     path: "/confirm-email",
    //     name: 'verify',
    //     component: verify
    // },
];

const router = createRouter({
history:createWebHistory(),
routes
});
router.beforeEach((to,from,next)=>{
    let token = localStorage.getItem('access_token')
    console.log(to.name);
    // if (!token){
    //     if (to.name !== 'login' && to.name !== 'registration' && to.name !== 'forget-password' && to.name !== 'reset-password' && to.name !== 'verify'){
    //         return next({
    //             name: 'login'
    //         })
    //     }
    // }
    // else{
    //     console.log(token);
    //     if (to.name === 'login' || to.name === 'registration' || to.name === 'forget-password' || to.name === 'reset-password' || to.name === 'verify'){
    //         return next({name:'stat'})
    //     }
    // }
return next();
})
export default router