// 인자 숫자 범위 사이의 랜덤한 숫자 생성
export default function createRandomNum(min: number, max: number): number {
  var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
}
