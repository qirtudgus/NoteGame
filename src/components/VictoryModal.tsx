import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { dungeon_request, LoginUserInfoInterface } from '../modules/login';
import BasicButtons from './BasicBtn';
import { RootState } from '../modules/modules_index';

const BgWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
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
  justify-content: center;
  flex-direction: column;
  align-items: center;
  user-select: none;
  & > p {
    font-size: 1.7rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

const VictoryModal = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const monsterInfo: any = useSelector((state: RootState) => state.monsterInfo.monsterInfo);
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  console.log(props.floorInput);
  return (
    <BgWrap>
      {props.isModal ? (
        <Bg>
          <p>승리!</p>
          <p>경험치 + {props.huntExp}</p>
          <p>잉크 + {Math.ceil(props.huntGold + (props.huntGold * userInfo.UpGoldHunt) / 100)}</p>
          <BasicButtons
            id='nextBtn'
            ClassName={props.cName}
            ButtonText={props.before ? '돌아가기' : '다음층으로'}
            color='#e5005a'
            OnClick={
              props.floorInput
                ? () => {
                    dispatch(
                      dungeon_request(
                        monsterInfo.monsterGold,
                        monsterInfo.monsterExp,
                        userInfo.UpGoldHunt,
                        userInfo.Exp,
                        userInfo.Level,
                        props.floorInput,
                      ),
                    );
                    navigate(-1);
                  }
                : () => {
                    dispatch(
                      dungeon_request(
                        monsterInfo.monsterGold,
                        monsterInfo.monsterExp,
                        userInfo.UpGoldHunt,
                        userInfo.Exp,
                        userInfo.Level,
                      ),
                    );
                    navigate(-1);
                  }
            }
          ></BasicButtons>
        </Bg>
      ) : (
        <Bg>
          <p>패배..</p>
          <BasicButtons
            ClassName={props.cName}
            ButtonText='돌아가기'
            color='#e5005a'
            OnClick={() => {
              navigate(-1);
            }}
          ></BasicButtons>
        </Bg>
      )}
    </BgWrap>
  );
};

export default VictoryModal;
