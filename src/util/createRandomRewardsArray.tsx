import { rewardsListObj } from './rewardsList';
import createRandomNumArray from './createRandomNumArray';
import { dungeonRewardsListObj } from './dungeonRewardList';

export const createRandomRewardsArray = (
  boxCount: number | null,
  useListName: string,
) => {
  const rewards: any = [];
  type useListName = 'penGame' | 'dungeon';

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
