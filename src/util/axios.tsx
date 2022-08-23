import axios from 'axios';

const DOMAIN = 'http://localhost:1234';

export const customAxios = async (method: string, url: string, data?: any): Promise<any> => {
  return await axios({
    method,
    url: DOMAIN + url,
    data,
  });
};
export default customAxios;
