import axios from 'axios';

const DOMAIN_EC2 = 'http://54.180.46.178:3001';

const TEST_DOMAIN = process.env.REACT_APP_SERVER_API || DOMAIN_EC2;

export const customAxios = async (method: string, url: string, data?: any): Promise<any> => {
  console.log(process.env.REACT_APP_SERVER_API);
  console.log(DOMAIN_EC2);
  console.log(TEST_DOMAIN);
  return await axios({
    method,
    url: TEST_DOMAIN + url,
    data,
  });
};
export default customAxios;
