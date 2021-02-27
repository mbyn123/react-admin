import http from '../axios'

// 新增
export const departmentAdd = (data)=>{
    return http.request({
        url:'/department/add/',
        method:'POST',
        data
    })
}

// 编辑
export const departmentEdit = (data)=>{
    return http.request({
        url:'/department/edit/',
        method:'POST',
        data
    })
}

// 获取数据
export const getDepartmentList = (data)=>{
    return http.request({
        url:'/department/list/',
        method:'POST',
        data
    })
}

// 删除
export const deleteDepartment = (data)=>{
    return http.request({
        url:'/department/delete/',
        method:'POST',
        data
    })
}

// 禁用状态
export const setDepartmentStatus = (data)=>{
    return http.request({
        url:'/department/status/',
        method:'POST',
        data
    })
}

// 详情
export const departmentDetailed = (data)=>{
    return http.request({
        url:'/department/detailed/',
        method:'POST',
        data
    })
}
