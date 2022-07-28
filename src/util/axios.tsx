import axios from "axios";

const DOMAIN = "http://localhost:1234";
const token = localStorage.getItem('token')

export const customAxios = async (method :string, url :string, data :any):Promise<any> => {
     return await axios({
        method,
        url : DOMAIN + url,
        data,
        headers: {
            Authorization:token!            
        }
    })
}
export default customAxios;