import axios from 'axios';

const DOMAIN = 'http://localhost:3000';
const DOMAIN_EC2 = 'http://54.180.46.178:3000';

export const customAxios = async (method: string, url: string, data?: any): Promise<any> => {
  return await axios({
    method,
    url: DOMAIN_EC2 + url,
    data,
  });
};
export default customAxios;
