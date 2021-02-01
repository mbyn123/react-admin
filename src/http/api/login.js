import http from '../axios'

export const login = (data)=>{
    return http.request({
        url:'/login/',
        method:'POST',
        data
    })
}

export const register = (data)=>{
    return http.request({
        url:'/register/',
        method:'POST',
        data
    })
}