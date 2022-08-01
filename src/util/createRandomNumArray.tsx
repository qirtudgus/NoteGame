//겹치지않는 min ~ max 사이의 숫자가 들어가며, bxoCount로 받아온 길이의 배열을 반환해준다.

import createRandomNum from '../util/createRandomNum';
import { rewardsListObj } from './rewardsList';

// 최대치는 rewardsList의 길이를 따라가게 설정해놓음
const arr: number = rewardsListObj.length - 1;
const min: number = 0;
const max: number = arr;

const createRandomNumArray = (boxCount: number | null) => {
  const randomResult: any = [];

  for (let i = 0; i < boxCount!; i++) {
    let num = createRandomNum(min, max);

    for (let j in randomResult) {
      if (num === randomResult[j]) {
        //현재 새로나온 숫자가 기존 숫자와 같으면
        num = createRandomNum(min, max);
      }
    }
    randomResult.push(num);
  }

  return randomResult;
};

export default createRandomNumArray;
