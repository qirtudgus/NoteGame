import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { forwardRef } from 'react';
import {
  PenWrap,
  PenEnd,
  PenWrapDungeon,
  PenEndDungeon,
  PenImg,
  PenImgWrap,
  PenEnd2,
  PenImgDun,
  PenImgWrapDun,
  PenEndDun,
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


        <PenImgWrapDun>
        <PenImgDun src={ballPenList[equipBallpen]} penSpeed={penSpeed} penStatus={penStatus}></PenImgDun>
        <PenEndDun penStatus={penStatus} ref={ref} penSpeed={penSpeed}></PenEndDun>

        </PenImgWrapDun>


        </>
      ) : (
        <>
        <PenImgWrap>
        <PenImg src={ballPenList[equipBallpen]} penSpeed={penSpeed} penStatus={penStatus}></PenImg>
        <PenEnd2 penStatus={penStatus} ref={ref} penSpeed={penSpeed}></PenEnd2>

        </PenImgWrap>
        
        </>
      )}
    </>
  );
};

export default forwardRef(Ballpen);
