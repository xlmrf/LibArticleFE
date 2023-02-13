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
import library from "./components/library/LibraryBaseComponent";
import document from "./components/document/DocumentBaseComponent"

import profileStatistic from "./components/profile/content_items/StatisticInfoComponent"
// import userCard from "./components/user/UserCardComponent"
import UserMain from "./components/profile/UserMainComponent"

import tutorial from "./components/fallback/TutorialComponent"
import support from "./components/additional/UnknownPageComponent"
import rules from "./components/additional/UnknownPageComponent"

import activity from "./components/activity/MainActivity"
import notices from "./components/activity/MessagesActivityComponent"
import story from "./components/activity/StoryActivityComponent"

import settings from "./components/settings/MainSettingsComponent"
import ProfileSettings from "./components/settings/AccountSettingsComponent"
import PrivacySettings from "./components/settings/PrivacySettingsComponent"
import AdvancedSettings from "./components/settings/AdvancedSettingsComponent"
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
                path:'/library',
                name:'library',
                component: library
            },
            {
                path:'/document/:id',
                name:'document',
                component: document
            },
            {
                path:'/profile/:id',
                name:'profile',
                component: UserMain,
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
                path:'/activity',
                name:'activity',
                component: activity,
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