export const getUserInfo = ()=>{
    return JSON.parse(localStorage.getItem("userInfo"))
}

export const setUserInfo = (val)=>{
    return localStorage.setItem("userInfo",val)
}