import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import 모남볼펜 from '../img/모남볼펜.png';
import 하이테크 from '../img/하이테크.png';
import { forwardRef } from 'react';
import {
  PenWrap,
  PenEnd,
  PenWrapDungeon,
  PenEndDungeon,
} from '../styledComponents/DungeonFight';

//https://yamoo9.gitbook.io/typescript/interface/index-signature
interface pen {
  [prop: string]: string;
}
const weapon: pen = { weapon1: 모남볼펜, weapon2: 하이테크 };
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
            <img src={weapon[equipBallpen]} alt='ballpen'></img>
          </PenWrapDungeon>
        </>
      ) : (
        <>
          <PenEnd penStatus={penStatus} ref={ref} penSpeed={penSpeed}></PenEnd>
          <PenWrap penSpeed={penSpeed} penStatus={penStatus}>
            <img src={equipBallpen} alt='ballpen'></img>
          </PenWrap>
        </>
      )}
    </>
  );
};

export default forwardRef(Ballpen);
