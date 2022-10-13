import { fork, all } from 'redux-saga/effects';
import getConfirmIdApiSaga from './confirmId_saga';
import getLoginApiSage from './login_saga';
import getRegisterApiSaga from './regitster_saga';
import getPenGameTakeGoldSaga from './pengame_saga';
import getSkillUpRequestSaga from './skill_saga';
import getMonsterCreateSaga from './createMonster_saga';
import getDungeonVictorySaga from './dungeon_saga';
import getBuyBallPenListSaga from './buyBallpenList_saga';
import getEquipBallpenSaga from './equipBallpen_saga';
import getStatUpRequestSaga from './stat_saga';
import getBuyPaperRequestApiSaga from './buyPaper_saga';
import getEquipPaperSaga from './equipPaper_saga';
import getConfirmNicknameApiSaga from './confirmNickname_saga';
import getIsHelpModalApiSaga from './isHelpModal_saga';
import getBuySkillPointRequestApiSaga from './buySkillPoint_saga';
function* rootSaga() {
  yield all([
    fork(getRegisterApiSaga),
    fork(getConfirmIdApiSaga),
    fork(getConfirmNicknameApiSaga),
    fork(getLoginApiSage),
    fork(getPenGameTakeGoldSaga),
    fork(getSkillUpRequestSaga),
    fork(getMonsterCreateSaga),
    fork(getDungeonVictorySaga),
    fork(getBuyBallPenListSaga),
    fork(getEquipBallpenSaga),
    fork(getStatUpRequestSaga),
    fork(getBuyPaperRequestApiSaga),
    fork(getEquipPaperSaga),
    fork(getIsHelpModalApiSaga),
    fork(getBuySkillPointRequestApiSaga),
  ]);
}

export default rootSaga;
