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
  justify-content: space-evenly;
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
const BuyConfirmModal = (props: any) => {
  return (
    <BgWrap>
      <Bg>
        {props.isModal ? (
          <>
            <p style={result}>정말 구매하시겠어요?</p>
            <div style={resultGold}>
              {props.penname} {props.Gold}
            </div>
            <BasicButtons
              ClassName={props.cName}
              ButtonText='구매하기'
              color='#e5005a'
              OnClick={props.OnClick}
            ></BasicButtons>
          </>
        ) : (
          <p style={result}>돈이 부족해요!</p>
        )}
      </Bg>
    </BgWrap>
  );
};

export default BuyConfirmModal;
