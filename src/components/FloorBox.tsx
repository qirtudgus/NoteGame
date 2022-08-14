import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';

const Floorwrap = styled.div`
  align-items: center;
  position: absolute;
  top: 100px;
  font-size: 30px;
  & img {
    width: 50px;
  }
`;

const FloorBox = (props:any) => {
  const userInfo = useSelector((state: RootState) => state.login.userInfo);

  return (
    <>
      <Floorwrap>{props.before ? `${userInfo?.DungeonFloor! - 1}층` :` ${userInfo?.DungeonFloor}층`}</Floorwrap>
    </>
  );
};
export default FloorBox;
