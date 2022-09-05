import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { ForwardedRef, forwardRef } from 'react';
import { PenImg, PenImgWrap, PenEnd2, PenImgDun, PenImgWrapDun } from '../styledComponents/DungeonFight_Effect';
import { LoginUserInfoInterface } from '../modules/login';
import { penObj } from '../util/shopList';
interface ballpen {
  penSpeed?: number;
  penStatus?: boolean;
  isDungeon?: boolean;
}

const Ballpen = ({ penStatus, isDungeon }: ballpen, ref: ForwardedRef<HTMLElement>) => {
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;

  let equipBallpen = userInfo.EquipBallpen;
  let equipBallpenImg = penObj.find((i: any) => i.ballPenName === equipBallpen)?.img;
  return (
    <>
      {isDungeon ? (
        <>
          <PenImgWrapDun>
            {/* <PenImgDun
              ref={ref}
              src={equipBallpenImg}
              penSpeed={userInfo.DungeonPenSpeed}
              penStatus={penStatus}
            ></PenImgDun>
            <PenEndDun
              penStatus={penStatus}
              penSpeed={userInfo.DungeonPenSpeed}
            ></PenEndDun> */}
            <PenImgDun
              id='penEnd2'
              src={equipBallpenImg}
            ></PenImgDun>
            {/* <PenEndDun id='penEnd'></PenEndDun> */}
          </PenImgWrapDun>
        </>
      ) : (
        <>
          <PenImgWrap>
            <PenImg
              src={equipBallpenImg}
              penSpeed={userInfo.PenGamePenSpeed}
              penStatus={penStatus}
            ></PenImg>
            <PenEnd2
              penStatus={penStatus}
              ref={ref}
              penSpeed={userInfo.PenGamePenSpeed}
            ></PenEnd2>
          </PenImgWrap>
        </>
      )}
    </>
  );
};

export default forwardRef(Ballpen);
