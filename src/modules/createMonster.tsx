export const CREATE_MONSTER_REQUEST =
  'createMonster/CREATE_MONSTER_REQUEST' as const;
export const CREATE_MONSTER_SUCCESS =
  'createMonster/CREATE_MONSTER_SUCCESS' as const;
export const CREATE_MONSTER_FAILURE =
  'createMonster/CREATE_MONSTER_FAILURE' as const;

export const create_monster_request = (dungeonFloor: number|undefined) => ({
  type: CREATE_MONSTER_REQUEST,
  dungeonFloor
});

export const create_monster_success = (monsterInfo:MonsterInfo) => ({
  type: CREATE_MONSTER_SUCCESS,
  ...monsterInfo,
});

export const create_monster_failure = (monsterInfo:MonsterInfo) => ({
  type: CREATE_MONSTER_FAILURE,
  ...monsterInfo,

});

interface MonsterInfo{
    monsterInfo:{
        monsterLevel:number | null
        monsterFullHp:number | null
        monsterNowHp?:number | null
        monsterExp:number | null
        monsterDamage:number | null
        monsterGold:number | null
    }
}

type CreateMonsterAction =
  | ReturnType<typeof create_monster_request>
  | ReturnType<typeof create_monster_success>
  | ReturnType<typeof create_monster_failure>;

type CreateMonsterStateType = {
    monsterInfo:{
        monsterLevel:number | null
        monsterFullHp:number | null
        monsterNowHp?:number | null
        monsterExp:number | null
        monsterDamage:number | null
        monsterGold:number | null
    }


};

const createMonsterState: CreateMonsterStateType = {
    monsterInfo: {
    monsterLevel:0,
    monsterFullHp:0,
    monsterNowHp:0,
    monsterExp:0,
    monsterDamage:0,
    monsterGold:0
}
};

const createMonsterRequest = (
  state: CreateMonsterStateType = createMonsterState,
  action: CreateMonsterAction,
): CreateMonsterStateType => {
  switch (action.type) {
    // case CONFIRM_ID_REQUEST: {
    //     return {confirmId : action.id}
    // }
    case CREATE_MONSTER_SUCCESS: {
      return { ...state, monsterInfo: action.monsterInfo };
    }
    case CREATE_MONSTER_FAILURE: {
      return { ...state,monsterInfo: action.monsterInfo };
    }
    default:
      return state;
  }
};

export default createMonsterRequest;
