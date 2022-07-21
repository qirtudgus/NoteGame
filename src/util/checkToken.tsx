import  jwt  from 'jsonwebtoken';
const SECRET_TOKEN :string = process.env.SECRET_TOKEN!;
type TokenType = string;

const checkToken = (id :string)=> {
    let result = jwt.verify("a",SECRET_TOKEN)
    console.log(result)
}

export default checkToken;