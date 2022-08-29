import styled from 'styled-components';
import 배경 from '../img/배경7.png';
import React from 'react';
const BgWrap = styled.div`
  width: 100%;
  height: 800px;
`;
// background: ${(props) => props.color || '#eee'};
const Bg = styled.div`
  width: 1026px;
  height: 830px;
  background: url(${배경});
  margin: 50px auto;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  user-select: none;
`;

const BgInWrap = styled.div`
  width: 1000px;
  height: 800px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;
//https://stackoverflow.com/questions/62690259/typescript-checking-in-react-functional-components
interface children {
  children?: React.ReactNode;
}

const BackGround = ({ children }: children) => {
  return (
    <BgWrap>
      <Bg id='penBox'>
        <BgInWrap>{children}</BgInWrap>
      </Bg>
    </BgWrap>
  );
};

export default React.memo(BackGround);
