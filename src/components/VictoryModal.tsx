import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { dungeon_request } from '../modules/login';
import BasicButtons from './BasicBtn';
import { RootState } from '../modules/modules_index';


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
  width: 400px;
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

const VictoryModal = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const monsterInfo:any = useSelector((state: RootState) => state.monsterInfo.monsterInfo)
    return (
    <BgWrap>
      {props.isModal ? (
        <Bg>
          <p style={result}>승리!</p>
          <p style={result}>경험치 {props.huntExp} 획득</p>
          <p style={result}>골드 {props.huntGold} 획득</p>
          <BasicButtons
            ClassName={props.cName}
            ButtonText='다음층으로'
            color='#e5005a'
            OnClick={()=>{
                dispatch(dungeon_request(monsterInfo.monsterGold,monsterInfo.monsterExp))

                navigate(-1)
            }}
          ></BasicButtons>
        </Bg>
      ) : (
        <Bg>
          <p style={result}>패배..</p>
          <BasicButtons
            ClassName={props.cName}
            ButtonText='돌아가기'
            color='#e5005a'
            OnClick={()=>{navigate(-1)}}
          ></BasicButtons>
        </Bg>
      )}
    </BgWrap>
  );
};

export default VictoryModal;
