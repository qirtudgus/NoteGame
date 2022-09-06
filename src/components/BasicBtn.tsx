import styled from 'styled-components';
import { ButtonColor } from './BtnMenu';
import React from 'react';
const BasicButton = styled(ButtonColor)<ButtonText>`
  width: 13rem;
  height: 3rem;
  font-size: 1.5rem;
  background: #fff;
  position: relative;
  z-index: 2;
  margin: ${(props) => props.margin || '0.5rem'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    filter: invert(100%);
  }
`;
interface ButtonText {
  ButtonText?: string;
  color?: string;
  OnClick?: any;
  disabled?: any;
  OnKeyDown?: any;
  OnKeyPress?: any;
  TabIndex?: any;
  ClassName?: any;
  margin?: string;
  id?: string;
}

const BasicButtons = ({
  ButtonText,
  color,
  OnClick,
  disabled,
  OnKeyDown,
  TabIndex,
  ClassName,
  OnKeyPress,
  margin,
  id,
}: ButtonText) => {
  return (
    <BasicButton
      onKeyPress={OnKeyPress}
      className={ClassName}
      tabIndex={TabIndex}
      onKeyUp={OnKeyDown}
      disabled={disabled}
      color={color}
      onClick={OnClick}
      margin={margin}
      id={id}
    >
      {ButtonText}
    </BasicButton>
  );
};

export default React.memo(BasicButtons);
