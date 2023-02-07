// // import router from 'vue-router'
// import {router} from '../../router';
// export default {
//     state:{
//         request: '',
//         response: 'empty',
//         files:[]
//
//     },
//     actions:{
//         findGlobal(ctx, data) {
//             if (data === '') {
//                 ctx.commit('updateResponse', 'empty')
//             }
//             else if(data.length === 1){
//                 ctx.commit('updateResponse', 'less value')
//             }
//             else {
//                 axios.post('search', {value: data}).then(res => {
//                     console.log('data', res.data);
//                     if (res.data === 'empty_data') {
//                         ctx.commit('updateResponse', 'Not Found')
//                     } else {
//                         ctx.commit('updateResponse', res.data)
//                     }
//                 }, err => {
//                     console.log('error', err)
//                 })
//             }
//         }
//     },
//     mutations:{
//         updateResponse(ctx,data){
//             ctx.response = data
//             // console.log('response-searcher', ctx.response)
//         }
//     },
//     getters:{
//         getFound(ctx){
//             console.log('return response-searcher', ctx.response)
//             return ctx.response
//         }
//     }
// }
