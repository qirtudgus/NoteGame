import { useSelector, useDispatch } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
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

const Ballpen = ({ penSpeed, penStatus, isDungeon }: any, ref: any) => {
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
            <img src={모남볼펜} alt='ballpen'></img>
          </PenWrapDungeon>
        </>
      ) : (
        <>
          <PenEnd penStatus={penStatus} ref={ref} penSpeed={penSpeed}></PenEnd>
          <PenWrap penSpeed={penSpeed} penStatus={penStatus}>
            <img src={모남볼펜} alt='ballpen'></img>
          </PenWrap>
        </>
      )}
    </>
  );
};

export default forwardRef(Ballpen);
