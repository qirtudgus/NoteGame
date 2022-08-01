import styled, { css } from 'styled-components';
import FastArrow from '../img/빠른재생.svg';

//props 사용을 위해 인터페이스로 타입 명시
//https://blog.devgenius.io/using-styled-components-and-props-with-typescript-react-a3c32a496f47
interface cornerBtn {
  corner: string;
  url?: string;
  func?: any;
}

//이미지 사용
//https://velog.io/@shinwonse/React-styled-components%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80
const ArrowImg = styled.img.attrs({
  src: `${FastArrow}`,
})`
  width: 30px;
  height: 30px;
`;

const FastForward = styled.div<cornerBtn>`
  cursor: pointer;

  width: 76px;
  height: 76px;
  background-color: #fff;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.corner &&
    css`
      position: absolute;
      top: 20px;
      left: 320px;
    `}
`;

const FastForwardBtn = (props: any) => {
  return (
    <>
      <FastForward {...props} onClick={props.func} title='빠른재생'>
        <ArrowImg alt='빠른재생' />
      </FastForward>
    </>
  );
};

export default FastForwardBtn;
