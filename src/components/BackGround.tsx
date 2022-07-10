import styled from "styled-components"

const Bg = styled.div`
    width:1000px;
    height:800px;
    background:${props => props.color || '#eee'};
    margin: 50px auto;
    position:relative;
    z-index:1;
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
//https://stackoverflow.com/questions/62690259/typescript-checking-in-react-functional-components
interface children {
    children : React.ReactNode
}

const BackGround = ({children}:children) => {
    return(
        <Bg>{children}</Bg>
        // <Bg color="#D9D9D9"  />
        

    )

}

export default BackGround