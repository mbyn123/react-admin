import http from '../axios'


export const requestData = (parmas) => {
    return http.request({
        url: parmas.url,
        method: parmas.method || 'POST',
        data: parmas.data
    })
}

