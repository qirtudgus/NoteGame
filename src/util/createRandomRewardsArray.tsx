import { rewardsListObj, rewardsListObj_multiple, rewardsList } from './rewardsList';
import createRandomNumArray from './createRandomNumArray';
import { dungeonRewardsListObj, dungeonRewardsList } from './dungeonRewardList';
import createRandomNum from '../util/createRandomNum';

export type useListName = 'penGame' | 'dungeon';
export type lists = rewardsList[] & dungeonRewardsList[];

export function createRandomRewardsArray(
  boxCount: number | null,
  useListName: useListName,
  UpMulilpleReward?: number,
): lists {
  let rewards: lists = [];
  const randomResult = createRandomNumArray(boxCount, useListName);

  //멀티플스킬이 찍혀있을 경우
  if (UpMulilpleReward === 1) {
    switch (useListName) {
      case 'penGame':
        randomResult.map((i: number) => {
          return rewards.push(rewardsListObj_multiple[i]);
        });
        break;
      case 'dungeon':
        randomResult.map((i: number) => {
          return rewards.push(dungeonRewardsListObj[i]);
        });
    }
  } else {
    switch (useListName) {
      case 'penGame':
        randomResult.map((i: number) => {
          return rewards.push(rewardsListObj[i]);
        });
        break;
      case 'dungeon':
        randomResult.map((i: number) => {
          return rewards.push(dungeonRewardsListObj[i]);
        });
    }
  }

  return rewards;
}

//던전에서 사용하는 값
export function createPenRewardArray(arr: number[]): number[] | undefined {
  let rewards: number[] = [];
  let rewardsCount = 6;
  const randomResult: number[] = [];
  if (arr === undefined) return;
  while (randomResult.length < rewardsCount) {
    let num = createRandomNum(0, arr.length - 1);
    if (randomResult.indexOf(num) === -1) {
      randomResult.push(num);
    }
  }
  randomResult.map((i: number) => {
    return rewards.push(arr[i]);
  });

  return rewards;
}
