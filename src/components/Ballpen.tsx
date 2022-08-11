import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { forwardRef } from 'react';
import {
  PenWrap,
  PenEnd,
  PenWrapDungeon,
  PenEndDungeon,
} from '../styledComponents/DungeonFight';
import { ballPenList } from '../util/ballPenList';

interface ballpen {
  penSpeed: number;
  penStatus: boolean;
  isDungeon?: boolean;
}

const Ballpen = ({ penSpeed, penStatus, isDungeon }: ballpen, ref: any) => {
  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  let equipBallpen = userInfo?.EquipBallpen as string;
  return (
    <>
      {isDungeon ? (
        <>
          <PenEndDungeon
            penStatus={penStatus}
            ref={ref}
            penSpeed={penSpeed}
          ></PenEndDungeon>
          <PenWrapDungeon penSpeed={penSpeed} penStatus={penStatus}>
            <img src={ballPenList[equipBallpen]} alt='ballpen'></img>
          </PenWrapDungeon>
        </>
      ) : (
        <>
          <PenEnd penStatus={penStatus} ref={ref} penSpeed={penSpeed}></PenEnd>
          <PenWrap penSpeed={penSpeed} penStatus={penStatus}>
            <img src={ballPenList[equipBallpen]} alt='ballpen'></img>
          </PenWrap>
        </>
      )}
    </>
  );
};

export default forwardRef(Ballpen);
