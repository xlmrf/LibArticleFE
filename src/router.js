import {createWebHistory, createRouter} from "vue-router";
import main from "./components/main"
import info from "./components/info"
import index from "./components/index";
import AuthBase from "./components/auth/AuthBase"
import verify from "./components/auth/VerifyAuthentication";
import login from "./components/auth/AuthenticationComponent"
import recoveryPassword from "./components/auth/RecoveryPasswordComponent"
import registration from "./components/auth/RegistrationComponent"
import setNewPassword from "./components/auth/ReplacePasswordComponent";
import NewDocument from "./components/new_document/select_type/NewDocumentBaseComponent"
import NewDocumentFields from "./components/new_document/select_type/DocumentTypesComponent"
// import library from "./components/library/LibraryBaseComponent";
import documents from "./view/Documents";
import document from "./view/Document"
import profile from "./view/Profile"

import profileStatistic from "./components/profile/old/content_items/StatisticInfoComponent"
// import userCard from "./components/user/UserCardComponent"
import UserMain from "./components/profile/old/UserMainComponent"

import tutorial from "./components/fallback/TutorialComponent"
import support from "./components/additional/UnknownPageComponent"
import rules from "./components/additional/UnknownPageComponent"

import actions from "./components/UserActions/MainActions"
import notices from "./components/UserActions/Notices"
import story from "./components/UserActions/StoryActions"

import settings from "./view/UserSettings"
import ProfileSettings from "./components/settings/Account"
import PrivacySettings from "./components/settings/Privacy"
import AdvancedSettings from "./components/settings/Security"
import DocumentMake from "@/view/DocumentMake";


import confirmEmail from "./components/auth/ConfirmEmail";

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
        component: AuthBase,
        children:[
            {
                path: '/login',
                name: 'login',
                component: login
            },
            {
                path: '/forget-password',
                name: 'forget-password',
                component: recoveryPassword
            },
            {
                path: "/reset-password/",
                name: 'reset-password',
                component: setNewPassword
            },
            {
                path: '/registration',
                name: 'registration',
                component: registration
            },
            {
                path: '/confirmEmail',
                name: 'ConfirmEmail',
                component: confirmEmail
            },

        ]
    },
    {
        path:'/',
        name:'main',
        component: main,
        children: [

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
                path:'/UserActions',
                name:'actions',
                component: actions,
                children:[
                    {
                        path:'/notices',
                        name:'notices',
                        component: notices
                    },
                    {
                        path:'/story',
                        name:'story',
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
                        component: PrivacySettings
                    },
                    // {
                    //     path:'advanced',
                    //     name:'settings.advanced',
                    //     component: AdvancedSettings
                    // }
                ]
            }


        ]
    },
    {
        path: "/verify-email",
        name: 'verify',
        component: verify
    },
    {
        path: "/confirm-email",
        name: 'verify',
        component: verify
    },
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