import styled, { css } from 'styled-components';
import backArrow from '../img/뒤로가기.svg';
import {Back} from './BtnMenu';


//이미지 사용
//https://velog.io/@shinwonse/React-styled-components%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80
const ArrowImg = styled.img.attrs({
  src: `${backArrow}`,
})`
  width: 30px;
  height: 30px;
`;

const ReP = styled.p`
font-weight:bold;
font-size:1.7rem;
`

const RevivalBtn = (props: any) => {

  return (
    <>
      <Back
        onClick={props.OnClick}
        title='환생하기'
      >
        <ReP>환생</ReP>
      </Back>
    </>
  );
};

export default RevivalBtn;
