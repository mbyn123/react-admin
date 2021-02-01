import http from '../axios'

export const login = ()=>{
    return http.request({
        url:'/login/',
        method:'',
        data:''
    })
}