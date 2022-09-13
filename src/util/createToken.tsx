import jwt from 'jsonwebtoken';
const SECRET_TOKEN: string = process.env.SECRET_TOKEN!;
type TokenType = string | unknown;

const createToken = (id: string | any): TokenType => {
  try {
    console.log(`${id}님의 토큰 생성`);
    return jwt.sign({ userId: id }, SECRET_TOKEN, { expiresIn: '60h' });
  } catch (err) {
    return err;
  }
};

export default createToken;
