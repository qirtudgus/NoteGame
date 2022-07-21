import  jwt  from 'jsonwebtoken';
const SECRET_TOKEN :string = process.env.SECRET_TOKEN!;
type TokenType = string;

const createToken = (id :string):TokenType => {
   return jwt.sign( { userId:id},SECRET_TOKEN,{expiresIn:'5s'})
}

export default createToken;