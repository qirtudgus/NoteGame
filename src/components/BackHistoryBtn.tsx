import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backArrow from '../img/뒤로가기.svg';
import {Back} from './BtnMenu';

//props 사용을 위해 인터페이스로 타입 명시
//https://blog.devgenius.io/using-styled-components-and-props-with-typescript-react-a3c32a496f47
interface cornerBtn {
  corner: string;
  url?: string;
}

//이미지 사용
//https://velog.io/@shinwonse/React-styled-components%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80
const ArrowImg = styled.img.attrs({
  src: `${backArrow}`,
})`
  width: 30px;
  height: 30px;
`;



const BackHistoryBtn = (props: any) => {
  const navigate = useNavigate();

  return (
    <>
      <Back
        {...props}
        onClick={() => {
          navigate(-1);
        }}
        title='뒤로가기'
      >
        <ArrowImg alt='뒤로가기' />
      </Back>
    </>
  );
};

export default BackHistoryBtn;
