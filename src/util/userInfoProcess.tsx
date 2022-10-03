// DB쿼리에서 uesrInfo를 전부 불러오고 리덕스에 상태를 업데이트하기전
// userInfo의 필요하지않은 값을 삭제하는 모듈입니다.
export interface userInfoInterface {
  Index?: number;
  Nickname?: string;
  Id?: string;
  Password?: string;
  Salt?: string;
  Level: number;
  BasicDamage: number;
  BasicHp: number;
  WeaponDamage: number;
  WeaponHp: number;
  EquipDamage: number;
  EquipHp: number;
  beforeGold?: number;
  Gold: number;
  Inventory: null | number;
  PenCount: number;
  UpGoldAll: number;
  UpGoldHunt: number;
  UpGoldPen: number;
  UpMaxHp: number;
  UpBasicDamage: number;
  UpWeaponDamage: number;
  UpWeaponHp: number;
  DoubleAttack: number;
  Grabber: number;
  Exp: number;
  DungeonFloor: number;
  BetterPen: number;
  SkillPoint: number;
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
  StatPoint: number;
  isLevelUp: boolean;
  IsHelpModal: number;
  UpMulilpleReward: number;
}

export const userInfoProcess = (arr: userInfoInterface) => {
  let result = {} as userInfoInterface;
  Object.assign(result, { ...arr });
  delete result.Index;
  delete result.Password;
  delete result.Salt;
  return result;
};
