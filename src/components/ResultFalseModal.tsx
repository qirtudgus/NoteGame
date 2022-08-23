import styled from 'styled-components';
import BasicButtons from './BasicBtn';

const BgWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
`;

const Bg = styled.div`
  border-radius: 20px;
  width: 600px;
  height: 400px;
  background: ${(props) => props.color || '#eee'};
  margin: 50px auto;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  user-select: none;
`;
//https://stackoverflow.com/questions/62690259/typescript-checking-in-react-functional-components
interface children {
  children?: React.ReactNode;
}
const re = {
  padding: '20px 0 20px 0',
  fontSize: '30px',
  fontWeight: 'bold',
};

const ResultFalseModal = (props: any, { children }: children) => {
  return (
    <BgWrap>
      <Bg>
        <p style={re}>열심히 멈춘 결과</p>
        <p>꽝입니다...</p>
        <BasicButtons
          ClassName={props.cName}
          ButtonText='이어서'
          color='#e5005a'
          OnClick={props.OnClick}
        ></BasicButtons>
      </Bg>
    </BgWrap>
  );
};

export default ResultFalseModal;
