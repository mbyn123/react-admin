import http from '../axios'


export const requestData = (parmas) => {
    return http.request({
        url: parmas.url,
        method: parmas.method || 'POST',
        data: parmas.data
    })
}

export const uploadToken = (data) => {
    return http.request({
        url: '/uploadIToken/',
        method: 'POST',
        data
    })
}



export const upload = (data) => {
    return http.request({
        url: '/upload/',
        method: 'POST',
        data
    })
}

