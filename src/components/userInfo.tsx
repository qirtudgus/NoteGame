import styled from "styled-components"

const BasicBox = styled.div`
    width:150px;
    height:150px;
    position:absolute;
    bottom:20px;
    left:50px;
    Background-color:#eee;
    font-size:2rem;
    line-height:3rem;
`
interface children {
    children : React.ReactNode
}

const BasicBoxs = ({children}:children) => {
    return(
        <BasicBox 
    >{children}</BasicBox>

    )

}

export default BasicBoxs