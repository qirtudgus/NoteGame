const frontText: string = 'Ink';
const deductText: string = '-';
const addText: string = '+';
const multipleText: string = 'x';

export interface rewardsList {
  front: string;
  number: number;
  back: string;
  action: string;
  color?: string;
}

//아래 두개의 배열은 길이가 같아야합니다.
//랜덤한 수가 들어간 배열을 생성 시 하나의 배열로 생성하기때문

export const rewardsListObj_multiple: rewardsList[] = [
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
  },
];

export const rewardsListObj: rewardsList[] = [
  {
    front: frontText,
    number: 100,
    back: deductText,
    action: 'deduct',
  },
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
];
