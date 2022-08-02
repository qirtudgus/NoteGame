// export const rewardsList: any = [
//   '골드 100 차감',
//   '골드 200 차감',
//   '골드 500 차감',
//   '골드 100 획득',
//   '골드 200 획득',
//   '골드 500 획득',
//   '골드 2배 획득',
//   '골드 3배 획득',
//   '골드 5배 획득',
// ];

const frontText:string = "골드"
const deductText:string = "차감"
const addText:string = "획득"
const multipleText:string = "배"
export const rewardsListObj: any = [
  {
    front:frontText,
    number:100,
    back:deductText,
    action:"deduct"
  },
  {
    front:frontText,
    number:200,
    back:deductText,
    action:"deduct"
  },
  {
    front:frontText,
    number:500,
    back:deductText,
    action:"deduct"
  },
  {
    front:frontText,
    number:1000,
    back:deductText,
    action:"deduct"
  },
  {
    front:frontText,
    number:1500,
    back:deductText,
    action:"deduct"
  },
  {
    front:frontText,
    number:100,
    back:addText,
    action:"add"
  },
  {
    front:frontText,
    number:200,
    back:addText,
    action:"add"
  },
  {
    front:frontText,
    number:500,
    back:addText,
    action:"add"
  },
  {
    front:frontText,
    number:1000,
    back:addText,
    action:"add"
  },
  {
    front:frontText,
    number:1500,
    back:addText,
    action:"add"
  },
  {
    front:frontText,
    number:2000,
    back:addText,
    action:"add"
  },
  {
    front:frontText,
    number:1.5,
    back:multipleText,
    action:"multiple",
    color:"red"
  },
  {
    front:frontText,
    number:2,
    back:multipleText,
    action:"multiple",
    color:"red"
  },
  
];

