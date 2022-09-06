// #penPoint 요소를 찾아서 해당 요소의 좌표를 반환합니다.
// NewDungeonFight에 쓰이고있습니다.
export const getRewardCoords = () => {
  const pen = document.querySelector('#penPoint') as Element;
  const x: number = pen.getBoundingClientRect().x as number;
  const y: number = (pen.getBoundingClientRect().y as number) - 20;
  let resultCoords = { x, y };
  return resultCoords;
};

export default getRewardCoords;
