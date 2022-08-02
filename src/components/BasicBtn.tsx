import styled from "styled-components"

const BasicButton = styled.button`
    width:13rem;
    height:3rem;
    font-size:1.5rem;
    background:${props => props.color || '#fff'};
    position:relative;
    z-index:2;
    margin-bottom:3rem;
    border:none;
    border-radius:5px;
    cursor: pointer;
`
interface ButtonText{
    ButtonText : string;
    color : string;
    OnClick? : any;
    disabled? :any;
    OnKeyDown? : any;
    TabIndex? :any;
    ClassName? :any;
}


const BasicButtons = ({ButtonText,color,OnClick,disabled,OnKeyDown,TabIndex,ClassName}:ButtonText) => {
    return(
        <BasicButton 
        className={ClassName}
        tabIndex={TabIndex}
        onKeyUp={OnKeyDown}
        disabled={disabled}
        color={color} onClick={OnClick}>{ButtonText}</BasicButton>

    )

}

export default BasicButtons