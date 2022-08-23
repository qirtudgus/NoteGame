import { rewardsListObj, rewardsList } from './rewardsList';
import createRandomNumArray from './createRandomNumArray';
import { dungeonRewardsListObj, dungeonRewardsList } from './dungeonRewardList';

export type useListName = 'penGame' | 'dungeon';
export type lists = rewardsList[] & dungeonRewardsList[];

export function createRandomRewardsArray(boxCount: number | null, useListName: useListName): lists {
  let rewards: lists = [];
  const randomResult = createRandomNumArray(boxCount, useListName);

  switch (useListName) {
    case 'penGame':
      randomResult.map((i: number) => {
        rewards.push(rewardsListObj[i]);
      });
      break;
    case 'dungeon':
      randomResult.map((i: number) => {
        rewards.push(dungeonRewardsListObj[i]);
      });
  }
  return rewards;
}
