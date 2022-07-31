import styled, { css } from 'styled-components';
import RefreshArrow from '../img/새로고침.svg';

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
  src: `${RefreshArrow}`,
})`
  width: 30px;
  height: 30px;
`;

const Refresh = styled.div<cornerBtn>`
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
      left: 120px;
    `}
`;

const RefreshBtn = (props: any) => {
  return (
    <>
      <Refresh {...props} onClick={props.func} title='새로고침'>
        <ArrowImg alt='새로고침' />
      </Refresh>
    </>
  );
};

export default RefreshBtn;
