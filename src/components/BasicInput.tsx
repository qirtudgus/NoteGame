import styled from "styled-components"

const BasicInput = styled.input`
    width:13rem;
    height:3rem;
    font-size:1.5rem;
    background:${props => props.color || '#fff'};
    position:relative;
    z-index:2;
    margin-bottom:3rem;
    border:none;
`
interface holder{
    placeholder : string;
    OnChange?: (e:any) => void;
    OnBlur?: (e:any) => void;
    value? : string;
    type? : string;

}


const BasicInputs = ({placeholder,OnChange,value,type,OnBlur}:holder) => {
    return(
        <BasicInput color="#fff" type={type} placeholder={placeholder} onChange={OnChange} onBlur={OnBlur} value={value}></BasicInput>

    )

}

export default BasicInputs