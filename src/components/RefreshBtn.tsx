import styled, { css } from 'styled-components';
import RefreshArrow from '../img/새로고침.svg';
import { Back } from './BtnMenu';

//이미지 사용
//https://velog.io/@shinwonse/React-styled-components%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80
const ArrowImg = styled.img.attrs({
  src: `${RefreshArrow}`,
})`
  width: 30px;
  height: 30px;
`;

const RefreshBtn = (props: any) => {
  return (
    <>
      <Back
        {...props}
        onClick={props.func}
        title='새로고침'
      >
        <ArrowImg alt='새로고침' />
      </Back>
    </>
  );
};

export default RefreshBtn;
