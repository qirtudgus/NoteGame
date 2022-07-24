import  jwt  from 'jsonwebtoken';
const SECRET_TOKEN :string = process.env.SECRET_TOKEN!;
type TokenType = string | unknown;


const createToken = (id :string):TokenType => {
    try{
        return jwt.sign( { userId:id},SECRET_TOKEN,{expiresIn:'5m'})

    }catch(err){
        return err
    }
}



export default createToken;