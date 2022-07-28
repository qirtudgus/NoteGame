import  jwt  from 'jsonwebtoken';
const SECRET_TOKEN :string = process.env.SECRET_TOKEN!;
type TokenType = string;



const checkToken = (token :string | undefined )=> {
        let result = jwt.verify(token!,SECRET_TOKEN)
        return result

}

export default checkToken;