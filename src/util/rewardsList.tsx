const frontText: string = '골드';
const deductText: string = '차감';
const addText: string = '획득';
const multipleText: string = '배';

export interface rewardsList {
  front: string;
  number: number;
  back: string;
  action: string;
  color?: string;
}

export const rewardsListObj: rewardsList[] = [
  {
    front: frontText,
    number: 100,
    back: deductText,
    action: 'deduct',
  },
  {
    front: frontText,
    number: 200,
    back: deductText,
    action: 'deduct',
  },
  {
    front: frontText,
    number: 100,
    back: addText,
    action: 'add',
  },
  {
    front: frontText,
    number: 200,
    back: addText,
    action: 'add',
  },
  {
    front: frontText,
    number: 500,
    back: addText,
    action: 'add',
  },
  {
    front: frontText,
    number: 1000,
    back: addText,
    action: 'add',
  },
  {
    front: frontText,
    number: 1000,
    back: addText,
    action: 'add',
  },
  {
    front: frontText,
    number: 1000,
    back: addText,
    action: 'add',
  },
  {
    front: frontText,
    number: 1500,
    back: addText,
    action: 'add',
  },
  {
    front: frontText,
    number: 2000,
    back: addText,
    action: 'add',
  },
  {
    front: frontText,
    number: 1.5,
    back: multipleText,
    action: 'multiple',
    color: 'red',
  },
];
