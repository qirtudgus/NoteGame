import styled from 'styled-components';

const BasicButton = styled.button<ButtonText>`
  width: 13rem;
  height: 3rem;
  font-size: 1.5rem;
  background:#fff;
  position: relative;
  z-index: 2;
  margin-bottom: 3rem;
  margin:${props => props.margin || '1rem'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow:inset 0px 0px 4px 0px rgba(0,0,0,0.4);
outline:1px solid#ddd;
outline-offset:-1px;
&:hover{
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
  margin?:string;
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
    >
      {ButtonText}
    </BasicButton>
  );
};

export default BasicButtons;
