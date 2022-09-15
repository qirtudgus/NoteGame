import styled from 'styled-components';
import React, { ComponentType, FunctionComponent, ReactNode } from 'react';

interface ButtonText {
  ButtonText?: string | null;
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
  children?: ReactNode;
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

  box-shadow: inset 0px 0px 4px 0px rgba(0, 0, 0, 0.4);
  outline: 1px solid#ddd;
  outline-offset: -1px;

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
  children,
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
      {children}
    </BasicButton>
  );
};

export default React.memo(BasicButtons);
