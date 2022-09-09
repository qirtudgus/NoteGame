import styled from 'styled-components';
import { ButtonColor } from './BtnMenu';
import React, { ComponentType, FunctionComponent } from 'react';

interface ButtonText {
  ButtonText?: string;
  color?: string;
  OnClick?: any;
  disabled?: boolean;
  OnKeyDown?: () => void;
  OnKeyPress?: () => void;
  TabIndex?: number | undefined;
  ClassName?: string;
  margin?: string;
  id?: string;
  as?: string | ComponentType<any> | undefined;
}

const BasicButton = styled.div<ButtonText>`
  width: 13rem;
  height: 3rem;
  font-size: 1.5rem;
  background: #fff;
  position: relative;
  z-index: 2;
  margin: ${(props) => props.margin || '0.5rem'};
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  &:hover {
    filter: invert(100%);
  }
`;

const BasicButtons: FunctionComponent<ButtonText> = ({
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
  as,
}) => {
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
      as={as}
    >
      {ButtonText}
    </BasicButton>
  );
};

export default React.memo(BasicButtons);
