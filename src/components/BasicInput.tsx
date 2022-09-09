import styled from 'styled-components';
import React, { ForwardedRef, forwardRef } from 'react';
const BasicInput = styled.input<holder>`
  height: 3rem;
  font-size: 1.5rem;
  width: ${(props) => props.width || '13rem'};
  background: ${(props) => props.color || '#fff'};

  position: relative;
  z-index: 2;
  margin-bottom: 3rem;
  margin: ${(props) => props.margin || '0 0 3rem 0'};
  border: none;
`;

interface holder {
  placeholder?: string;
  OnChange?: (e: any) => void;
  OnBlur?: (e: any) => void;
  value?: string;
  type?: string;
  color?: string;
  ref?: any;
  maxLength?: number;
  margin?: string;
  width?: string;
  disabled?: boolean;
}

const BasicInputs = (
  { placeholder, OnChange, value, type, OnBlur, color, maxLength, margin, width, disabled }: holder,
  ref: ForwardedRef<any>,
) => {
  return (
    <BasicInput
      width={width}
      color={color}
      type={type}
      margin={margin}
      placeholder={placeholder}
      onChange={OnChange}
      onBlur={OnBlur}
      value={value}
      ref={ref}
      maxLength={maxLength}
      disabled={disabled}
    ></BasicInput>
  );
};

export default React.memo(forwardRef(BasicInputs));
