//액션 타입 선언
export const LOGIN_REQUEST = 'login/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'login/LOGIN_FAILURE' as const;
export const LOGIN_LOCALSTORAGE = 'login/LOGIN_LOCALSTORAGE' as const;
export const LOGIN_LOCALSTORAGE_SUCCESS = 'login/LOGIN_LOCALSTORAGE_SUCCESS' as const;
export const LOGIN_LOCALSTORAGE_FAILURE = 'login/LOGIN_LOCALSTORAGE_FAILURE' as const;
export const LOGOUT_REQUSET = 'login/LOGOUT_REQUEST' as const;

//볼펜 굴리기 관련 액션
export const PENGAME_REQUEST = 'login/PENGAME_REQUEST' as const;
export const PENGAME_MULTIPLE = 'login/PENGAME_MULTIPLE' as const;

//스킬 관련 액션
export const SKILL_REQUEST = 'login/SKILL_REQUEST' as const;
export const SKILL_UP = 'login/SKILL_UP' as const;

//스텟 관련 액션
export const STAT_REQUEST = 'login/STAT_REQUEST' as const;
export const STAT_UP = 'login/STAT_UP' as const;

//던전 관련 액션
export const DUNGEON_REQUEST = 'login/DUNGEON_REQUEST' as const;
export const DUNGEON_VICTORY = 'login/DUNGEON_VICTORY' as const;

//볼펜 장착 관련 액션
export const EQUIP_BALLPEN_REQUEST = 'login/EQUIP_BALLPEN_REQUEST' as const;
export const EQUIP_BALLPEN_SUCCESS = 'login/EQUIP_BALLPEN_SUCCESS' as const;
export const DB_REFRESH_SUCCESS = 'login/DB_REFRESH_SUCCESS' as const;

//종이 구매, 장착 관련 액션
export const EQUIP_PAPER_REQUEST = 'login/EQUIP_PAPER_REQUEST' as const;
export const EQUIP_PAPER_SUCCESS = 'login/EQUIP_PAPER_SUCCESS' as const;

//환생 관련 액션
export const REVIVAL_REQUSET = 'login/REVIVAL_REQUSET' as const;
export const REVIVAL_SUCCESS = 'login/REVIVAL_SUCCESS' as const;

//레벨업 관련 액션
export const LEVELUP_FAILURE = 'login/LEVELUP_FAILURE' as const;

//도움말 모달 관련 액션
export const ISHELPMODAL_CONFIRM = 'login/ISHELPMODAL_CONFIRM' as const;
export const ISHELPMODAL_SUCCESS = 'login/ISHELPMODAL_SUCCESS' as const;

//스킬포인트 구매 관련 액션
export const BUY_SKILLPOINT_REQUEST = 'login/BUY_SKILLPOINT_REQUEST' as const;
export const BUY_SKILLPOINT_SUCCESS = 'login/BUY_SKILLPOINT_SUCCESS' as const;

//userInfo 초기값 객체
//렌더링할 때 필요한 값들입니다.
export let setUserInfo = {
  Nickname: '',
  Level: 0,
  BasicDamage: 0,
  BasicHp: 0,
  WeaponDamage: 0,
  WeaponHp: 0,
  Gold: 0,
  beforeGold: 0,
  PenCount: 0,
  SkillPoint: 0,
  UpGoldPen: 0,
  UpGoldHunt: 0,
  UpMaxHp: 0,
  UpBasicDamage: 0,
  DungeonFloor: 0,
  BetterPen: 0,
  Exp: 0,
  NeedExp: 0,
  EquipBallpen: '',
  EquipPaper: '',
  DungeonPenSpeed: 1,
  PenGamePenSpeed: 1,
  RevivalPoint: 0,
  RevivalCount: 0,
  MaxDungeonFloor: 0,
  DungeonClearCount: 0,
  UpMoreFloor: 0,
  UpRevivalStatPoint: 0,
  UpDoubleAttack: 0,
  UpMulilpleReward: 0,
  StatPoint: 0,
  isLevelUp: false,
  IsHelpModal: 0,
  BuySkillPointCount: 0,
};
export const buy_skillpoint_success = () => ({
  type: BUY_SKILLPOINT_SUCCESS,
  userInfo: setUserInfo,
});

export const buy_skillpoint_request = (BuySkillPointCount: number) => ({
  type: BUY_SKILLPOINT_REQUEST,
  BuySkillPointCount,
});

export const ishelpmodal_confirm = () => ({
  type: ISHELPMODAL_CONFIRM,
});

export const ishelpmodal_success = () => ({
  type: ISHELPMODAL_SUCCESS,
  userInfo: setUserInfo,
});

export const levelup_failure = (setUserInfo: any) => ({
  type: LEVELUP_FAILURE,
  userInfo: setUserInfo,
});

export const equip_paper_request = (paperName: string, WeaponHp: number) => ({
  type: EQUIP_PAPER_REQUEST,
  paperName,
  WeaponHp,
});
export const equip_paper_success = () => ({
  type: EQUIP_PAPER_SUCCESS,
  userInfo: setUserInfo,
});

export const revival_request = () => ({
  type: REVIVAL_REQUSET,
});

export const revival_success = () => ({
  type: REVIVAL_SUCCESS,
  userInfo: setUserInfo,
});

export const db_refresh_success = () => ({
  type: DB_REFRESH_SUCCESS,
  userInfo: setUserInfo,
});

export const equip_ballpen_request = (ballpenName: string, weaponDamage: number, PenSpeed: {}) => ({
  type: EQUIP_BALLPEN_REQUEST,
  ballpenName,
  weaponDamage,
  PenSpeed,
});

export const equip_ballpen_success = () => ({
  type: EQUIP_BALLPEN_SUCCESS,
  userInfo: setUserInfo,
});

export const dungeon_request = (
  monsterGold: number,
  monsterExp: number,
  UpGoldHunt: number,
  userExp: number,
  userLevel: number,
  before?: boolean,
) => ({
  type: DUNGEON_REQUEST,
  payload: { monsterGold, monsterExp, before, UpGoldHunt, userExp, userLevel },
});

export const dungeon_victory = () => ({
  type: DUNGEON_VICTORY,
  userInfo: setUserInfo,
});

export const skill_request = (skillName: string, skillPoint: number) => ({
  type: SKILL_REQUEST,
  payload: { skillName, skillPoint },
});

export const skill_up = () => ({
  type: SKILL_UP,
  userInfo: setUserInfo,
});

export const stat_request = (statName: string, statPoint: number, takePoint: number) => ({
  type: STAT_REQUEST,
  payload: { statName, statPoint, takePoint },
});

export const stat_up = () => ({
  type: STAT_UP,
  userInfo: setUserInfo,
});

export const login_request = (id: string, password: string) => ({
  type: LOGIN_REQUEST,
  payload: { id, password },
});

export const login_succes = (token: string | undefined) => ({
  type: LOGIN_SUCCESS,
  token: { token },
  id: undefined,
  userInfo: setUserInfo,
});

export const login_failure = (token: string | undefined) => ({
  type: LOGIN_FAILURE,
  token: { token },
  id: undefined,
});

export const login_localstorage = (token: string | undefined) => ({
  type: LOGIN_LOCALSTORAGE,
  token: { token },
});

export const login_localstorage_success = (token: string | undefined) => ({
  type: LOGIN_LOCALSTORAGE_SUCCESS,
  token: { token },
  id: undefined,
  userInfo: setUserInfo,
});

export const login_localstorage_failure = () => ({
  type: LOGIN_LOCALSTORAGE_FAILURE,
  id: undefined,
});

export const logout = () => ({
  type: LOGOUT_REQUSET,
});

export const pengame_request = (reward: number, act: string, speed: number) => ({
  type: PENGAME_REQUEST,
  act,
  reward,
  speed,
});

export const pengame_multiple = () => ({
  type: PENGAME_MULTIPLE,
  userInfo: setUserInfo,
});

// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
type LoginAction =
  | ReturnType<typeof login_request>
  | ReturnType<typeof login_succes>
  | ReturnType<typeof login_localstorage>
  | ReturnType<typeof login_localstorage_success>
  | ReturnType<typeof login_localstorage_failure>
  | ReturnType<typeof login_failure>
  | ReturnType<typeof logout>
  | ReturnType<typeof pengame_multiple>
  | ReturnType<typeof skill_request>
  | ReturnType<typeof skill_up>
  | ReturnType<typeof stat_request>
  | ReturnType<typeof stat_up>
  | ReturnType<typeof dungeon_request>
  | ReturnType<typeof dungeon_victory>
  | ReturnType<typeof equip_ballpen_request>
  | ReturnType<typeof equip_ballpen_success>
  | ReturnType<typeof equip_paper_request>
  | ReturnType<typeof equip_paper_success>
  | ReturnType<typeof db_refresh_success>
  | ReturnType<typeof revival_request>
  | ReturnType<typeof revival_success>
  | ReturnType<typeof levelup_failure>
  | ReturnType<typeof ishelpmodal_confirm>
  | ReturnType<typeof ishelpmodal_success>
  | ReturnType<typeof buy_skillpoint_request>
  | ReturnType<typeof buy_skillpoint_success>;

export interface LoginUserInfoInterface {
  Nickname: string;
  Level: number;
  BasicDamage: number;
  BasicHp: number;
  WeaponDamage: number;
  WeaponHp: number;
  Gold: number;
  beforeGold: number;
  PenCount: number;
  SkillPoint: number;
  UpGoldPen: number;
  UpGoldHunt: number;
  UpMaxHp: number;
  UpBasicDamage: number;
  DungeonFloor: number;
  BetterPen: number;
  Exp: number;
  EquipBallpen: string;
  EquipPaper: string;
  DungeonPenSpeed: number;
  PenGamePenSpeed: number;
  RevivalPoint: number;
  RevivalCount: number;
  MaxDungeonFloor: number;
  DungeonClearCount: number;
  UpMoreFloor: number;
  UpRevivalStatPoint: number;
  UpDoubleAttack: number;
  UpMulilpleReward: number;
  StatPoint: number;
  isLevelUp: boolean;
  IsHelpModal: number;
  BuySkillPointCount: number;
  [prop: string]: any;
}

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
type IsLoginState = {
  isLogin: boolean;
  token: string | undefined | any;
  id?: string | number | undefined;
  tokenExpired?: boolean;
  userInfo?: LoginUserInfoInterface;
};

// 초기상태를 선언합니다.
const LoginState: IsLoginState = {
  isLogin: false,
  token: undefined,
  id: undefined,
  tokenExpired: false,
  userInfo: setUserInfo,
};

const LoginRequest = (state: IsLoginState = LoginState, action: LoginAction): IsLoginState => {
  switch (action.type) {
    // case LOGIN_REQUEST:{
    //     return { isLogin : true, }
    // }
    case LOGIN_SUCCESS: {
      return {
        isLogin: true,
        token: action.token,
        id: action.id,
        userInfo: action.userInfo,
        tokenExpired: false,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...LoginState,
        tokenExpired: true,
      };
    }
    case LOGIN_LOCALSTORAGE_SUCCESS: {
      return {
        isLogin: true,
        token: action.token,
        id: action.id,
        userInfo: action.userInfo,
        tokenExpired: false,
      };
    }
    case LOGIN_LOCALSTORAGE_FAILURE: {
      return {
        isLogin: false,
        token: undefined,
        id: undefined,
        tokenExpired: true,
      };
    }
    case LOGOUT_REQUSET: {
      return {
        isLogin: false,
        token: undefined,
        id: undefined,
        tokenExpired: false,
      };
    }
    case PENGAME_MULTIPLE: {
      return { ...state, userInfo: action.userInfo };
    }
    case SKILL_UP: {
      return { ...state, userInfo: action.userInfo };
    }
    case STAT_UP: {
      return { ...state, userInfo: action.userInfo };
    }
    case DUNGEON_VICTORY: {
      return { ...state, userInfo: action.userInfo };
    }
    case EQUIP_BALLPEN_SUCCESS: {
      return { ...state, userInfo: action.userInfo };
    }
    case EQUIP_PAPER_SUCCESS: {
      return { ...state, userInfo: action.userInfo };
    }
    case DB_REFRESH_SUCCESS: {
      return { ...state, userInfo: action.userInfo };
    }
    case REVIVAL_SUCCESS: {
      return { ...state, userInfo: action.userInfo };
    }
    case LEVELUP_FAILURE: {
      return { ...state, userInfo: action.userInfo };
    }
    case ISHELPMODAL_SUCCESS: {
      return { ...state, userInfo: action.userInfo };
    }
    case BUY_SKILLPOINT_SUCCESS: {
      return { ...state, userInfo: action.userInfo };
    }
    default:
      return state;
  }
};

export default LoginRequest;
