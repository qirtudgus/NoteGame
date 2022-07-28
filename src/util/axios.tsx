import axios from "axios";

const DOMAIN = "http://localhost:1234";

export const customAxios = async (method? :string, url? :string, data? :any):Promise<any> => {
    // const token = localStorage.getItem('token') as string

    return await axios({
        method,
        url : DOMAIN + url,
        data,
        // headers: {
        //     authorization:token!          
        // }
    })
}
export default customAxios;