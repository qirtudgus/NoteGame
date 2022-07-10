import BackGround from "./BackGround"
import BasicButtons from "./BasicButton"
import BasicInputs from "./BasicInput"

const Register = () => {
    return (
        <BackGround>
        <BasicInputs placeholder="아이디"></BasicInputs>
        <BasicInputs placeholder="비밀번호"></BasicInputs>
        <BasicInputs placeholder="비밀번호 확인"></BasicInputs>
        <BasicButtons ButtonText="회원가입" color="#fff"></BasicButtons>
        </BackGround>
    )
}

export default Register

