//겹치지않는 min ~ max 사이의 숫자가 들어가며, bxoCount로 받아온 길이의 배열을 반환해준다.

import createRandomNum from '../util/createRandomNum';
import { dungeonRewardsListObj } from './dungeonRewardList';
import { rewardsListObj } from './rewardsList';
import { useListName } from './createRandomRewardsArray';
// 최대치는 rewardsList의 길이를 따라가게 설정해놓음
const arr: number = rewardsListObj.length - 1;
const dungeonArr: number = dungeonRewardsListObj.length - 1;
const min: number = 0;
const max: number = arr;
const dungeonMax: number = dungeonArr;

const createRandomNumArray = (
  boxCount: number | null,
  useListName: useListName,
) => {
  const randomResult:number[] = [];

  if (useListName === 'penGame') {
    while (randomResult.length < boxCount!) {
      let num = createRandomNum(min, max);
      if (randomResult.indexOf(num) === -1) {
        randomResult.push(num);
      }
    }
  }
  if (useListName === 'dungeon') {
    while (randomResult.length < boxCount!) {
      let num = createRandomNum(min, dungeonMax);
      if (randomResult.indexOf(num) === -1) {
        randomResult.push(num);
      }
    }
  }

  return randomResult;
};

export default createRandomNumArray;
