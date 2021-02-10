import http from '../axios'

export const departmentAdd = (data)=>{
    return http.request({
        url:'/department/add/',
        method:'POST',
        data
    })
}