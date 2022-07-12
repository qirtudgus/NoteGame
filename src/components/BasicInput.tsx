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
    value? : string;
}


const BasicInputs = ({placeholder,OnChange,value}:holder) => {
    return(
        <BasicInput color="#fff" placeholder={placeholder} onChange={OnChange} value={value}></BasicInput>

    )

}

export default BasicInputs