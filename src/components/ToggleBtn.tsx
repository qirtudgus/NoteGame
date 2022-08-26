import { useState } from 'react';
import styled, { css } from 'styled-components';
import ButtonColor from './BtnMenu';

interface isToggle {
  isToggle: boolean;
}

const DetailViewBtn = styled(ButtonColor)<isToggle>`
  cursor: pointer;
  position: absolute;
  z-index: 100;
  width: 110px;
  height: 60px;
  border-radius: 50px;
  background: #fff;
  display: flex;
  align-items: center;
  transition: 0.3s;
  & > p {
    font-size: 2rem;
    position: absolute;
    left: 60px;
  }

  ${(props) =>
    props.isToggle &&
    css`
      background: linear-gradient(0deg, #ff2819, #ffc719);
      & > p {
        font-size: 2rem;
        position: absolute;
        left: 10px;
      }
    `}
`;

const DetailViewCircle = styled.div<isToggle>`
  position: relative;
  left: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: #555;
  transition: 0.3s;
  ${(props) =>
    props.isToggle &&
    css`
      background: #fff;
      left: calc(100% - 55px);
    `}
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const ToggleBtn = () => {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <DetailViewBtn
      as='div'
      isToggle={isToggle}
      onClick={() => {
        setIsToggle((prev) => !prev);
      }}
    >
      <p> {isToggle ? 'on' : 'off'}</p>
      <DetailViewCircle isToggle={isToggle}></DetailViewCircle>
    </DetailViewBtn>
  );
};

export default ToggleBtn;
