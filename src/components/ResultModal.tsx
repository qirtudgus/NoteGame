import styled from 'styled-components';
import BasicButtons from './BasicBtn';
const BgWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
`;

const Bg = styled.div`
  border-radius: 20px;
  width: 600px;
  height: 300px;
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
const result = {
  fontSize: '30px',
  fontWeight: 'bold',
};
const resultGold = {
  fontSize: '20px',
  fontWeight: 'bold',
};
const falseGold = {
  fontSize: '20px',
};
const ResultModal = (props: any) => {
  return (
    <BgWrap>
      {props.isModal ? (
        <Bg>
          <p style={result}>열심히 멈춘 결과</p>
          <div style={resultGold}>
            <p>{props.beforeGold?.toLocaleString()} 골드에서</p>
            <p>{props.afterGold?.toLocaleString()} 골드로!</p>
          </div>
          <BasicButtons
            ClassName={props.cName}
            ButtonText='이어서'
            OnClick={props.OnClick}
          ></BasicButtons>
        </Bg>
      ) : (
        <Bg>
          <p style={result}>열심히 멈춘 결과</p>
          <p style={falseGold}>꽝입니다...</p>
          <BasicButtons
            ClassName={props.cName}
            ButtonText='이어서'
            OnClick={props.OnClick}
          ></BasicButtons>
        </Bg>
      )}
    </BgWrap>
  );
};

export default ResultModal;
