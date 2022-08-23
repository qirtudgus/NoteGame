import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeSVG from '../img/홈.svg';
import React from 'react';
import { Back } from './BtnMenu';

//이미지 사용
//https://velog.io/@shinwonse/React-styled-components%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80
const ArrowImg = styled.img.attrs({
  src: `${HomeSVG}`,
})`
  width: 30px;
  height: 30px;
`;

const HomeBtn = (props: any) => {
  const navigate = useNavigate();

  return (
    <>
      <Back
        {...props}
        onClick={() => {
          navigate('/home');
        }}
        title='마을로'
      >
        <ArrowImg alt='home' />
      </Back>
    </>
  );
};

export default React.memo(HomeBtn);
