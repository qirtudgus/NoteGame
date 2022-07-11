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
`
interface ButtonText{
    ButtonText : string;
    color : string;
    func? : any;
}


const BasicButtons = ({ButtonText,color,func}:ButtonText) => {
    return(
        <BasicButton color={color} onClick={func}>{ButtonText}</BasicButton>

    )

}

export default BasicButtons