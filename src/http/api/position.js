import http from '../axios'


export const positionAdd = (data)=>{
    return http.request({
        url:'/job/add/',
        method:'POST',
        data
    })
}