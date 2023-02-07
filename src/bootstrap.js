import {router} from "./router";

window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('./bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library.vue which allows us to easily issue requests
 * to our Laravel back-end. This library.vue automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
const token = localStorage.getItem('access_token');
console.log("token: ",token);
if (token) {
    // alert('token is '+token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
// window.axios.interceptors.response.use({},err => {
//     if (err.response.status === 419){
//         router.push('login')
//     }
// })
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
