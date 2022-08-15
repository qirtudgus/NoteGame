import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logOut from '../img/로그아웃.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../modules/login';

//props 사용을 위해 인터페이스로 타입 명시
//https://blog.devgenius.io/using-styled-components-and-props-with-typescript-react-a3c32a496f47
interface cornerBtn {
  corner: boolean;
  url?: string;
}

//이미지 사용
//https://velog.io/@shinwonse/React-styled-components%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80
const BtnImg = styled.img.attrs({
  src: `${logOut}`,
})`
  width: 30px;
  height: 30px;
`;

const Back = styled.div<cornerBtn>`
  cursor: pointer;
  z-index:100;
  width: 76px;
  height: 76px;
  background-color: #fff;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.corner && css`
  position:absolute;
  bottom:-680px;
  left:850px;
  `}
`;


const LogOutBtn = () => {
  const dispatch = useDispatch();
  const logOutRequest = () => {
    dispatch(logout());
  };

  return (
    <>
      <Back
      corner={true}
        onClick={() => {
            logOutRequest()
        }}
        title='로그아웃'
      >
        <BtnImg alt='logOut' />
      </Back>
    </>
  );
};

export default LogOutBtn;
