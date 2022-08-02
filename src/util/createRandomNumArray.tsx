//겹치지않는 min ~ max 사이의 숫자가 들어가며, bxoCount로 받아온 길이의 배열을 반환해준다.

import createRandomNum from '../util/createRandomNum';
import { rewardsListObj } from './rewardsList';

// 최대치는 rewardsList의 길이를 따라가게 설정해놓음
const arr: number = rewardsListObj.length - 1;
const min: number = 0;
const max: number = arr;

const createRandomNumArray = (boxCount: number | null) => {
  const randomResult: any = [];

  // let a = "background-image:url('https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb7M9Gg%2FbtrB8QT59ff%2FNArQJVv9yOkH6BuoC9e5D0%2Fimg.png') !important"

  // let b = a.substring(22).split(`')`)[0]
  // console.log(b)
  
  while (randomResult.length < boxCount!){
    let num = createRandomNum(min, max);
    if(randomResult.indexOf(num) === -1){
      randomResult.push(num)
    }
  }

  // for (let i = 0; i < boxCount!; i++) {
  //   let num = createRandomNum(min, max);



  //   for (let j in randomResult) {
  //     while (num === randomResult[j]) {
  //       //현재 새로나온 숫자가 기존 숫자와 같으면
  //       num = createRandomNum(min, max);
  //       console.log(num)
  //     }
  //   }
  //   randomResult.push(num);
  // }

  console.log(randomResult)



// function shuffleArrayES6(array:[]) {
//     for (let i = array.length! - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }



  return randomResult;
};





export default createRandomNumArray;
