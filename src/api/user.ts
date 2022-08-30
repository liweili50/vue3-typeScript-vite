import request from "../utils/request";


interface Login {
    identifier: string;
    password: string;
}
export function doLogin(data: Login) {
    return request({
        url: '/auth/local',
        method: 'post',
        data
    })
}

