import styled from "styled-components"

const BasicInput = styled.input`
    width:100px;
    height:30px;
    background:${props => props.color || '#fff'};
    position:relative;
    z-index:2;

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