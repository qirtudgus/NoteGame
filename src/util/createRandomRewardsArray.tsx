import { rewardsList } from './rewardsList';
import createRandomNumArray from './createRandomNumArray';

export const createRandomRewardsArray = (boxCount: number | null) => {
  const rewards: any = [];

  const randomResult = createRandomNumArray(boxCount);

  randomResult.map((i: number) => {
    rewards.push(rewardsList[i]);
  });

  return rewards;
};
