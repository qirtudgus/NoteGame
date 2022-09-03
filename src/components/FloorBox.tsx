import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface } from '../modules/login';

const Floorwrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
  color: #fff;
  height: 70px;
  width: 100px;
  border-radius: 10px;
  font-size: 30px;
`;

const FloorBox = (props: any) => {
  const { DungeonFloor } = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;

  return (
    <>
      <Floorwrap>{props.before ? `${DungeonFloor - 1}층` : ` ${DungeonFloor}층`}</Floorwrap>
    </>
  );
};
export default FloorBox;
