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
}


const BasicInputs = ({placeholder}:holder) => {
    return(
        <BasicInput color="#fff" placeholder={placeholder}></BasicInput>

    )

}

export default BasicInputs