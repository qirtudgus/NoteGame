import { rewardsListObj } from './rewardsList';
import createRandomNumArray from './createRandomNumArray';
import { dungeonRewardsListObj } from './dungeonRewardList';

export type useListName = 'penGame' | 'dungeon';

export const createRandomRewardsArray = (
  boxCount: number | null,
  useListName: useListName,
) => {
  const rewards: any[] = [];
 

  const randomResult = createRandomNumArray(boxCount, useListName);

  if (useListName === 'penGame') {
    randomResult.map((i: number) => {
      rewards.push(rewardsListObj[i]);
    });
    return rewards;
  }

  if (useListName === 'dungeon') {
    randomResult.map((i: number) => {
      rewards.push(dungeonRewardsListObj[i]);
    });
    return rewards;
  }
  return rewards;
};
