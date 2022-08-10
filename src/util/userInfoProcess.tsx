export interface userInfoInterface {
  Index?: number;
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
  HuntingCount: number;
  UpGoldAll: number;
  UpGoldHunt: number;
  UpGoldPen: number;
  UpWeaponDamage: number;
  UpWeaponHp: number;
  DoubleAttack: number;
  Grabber: number;
  Exp: number;
  NeedExp?: number;
  DungeonFloor: number;
  BetterPen: number;
  SkillPoint: number;
}

export const userInfoProcess = (arr: userInfoInterface) => {
  let result: userInfoInterface = {} as userInfoInterface;
  Object.assign(result, { ...arr });
  delete result.Index;
  delete result.Password;
  delete result.Salt;
  return result;
};
