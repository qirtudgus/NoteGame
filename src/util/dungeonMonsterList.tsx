import 슬라임_1 from '../img/monster/슬라임_1.png';
import 슬라임_2 from '../img/monster/슬라임_2.png';
import 슬라임_3 from '../img/monster/슬라임_3.png';
import 말미잘_1 from '../img/monster/말미잘_1.png';
import 지렁용_1 from '../img/monster/지렁용_1.png';
import 지렁용_2 from '../img/monster/지렁용_2.png';
import 지렁용_3 from '../img/monster/지렁용_3.png';
interface a {
  monsterNumber: string;
  name: string;
  img: JSX.Element;
  desc?: string;
}
export const monsterArr: a[] = [
  {
    monsterNumber: `001`,
    name: '작은 슬라임',
    desc: '귀여운 슬라임. 정수리에 있는 털이 없어지면 죽는다는 소문이 있다...',
    img: (
      <img
        src={슬라임_1}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `002`,
    name: '사춘기 슬라임',
    desc: '머리속에 감춰져있던 몸이 자라난 슬라임, 항상 예민한 상태다.',

    img: (
      <img
        src={슬라임_2}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `003`,
    name: '킹 슬라임',
    desc: '끝까지 털을 지켜내어 결국 왕의 자질을 갖춘 슬라임',
    img: (
      <img
        src={슬라임_3}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `004`,
    name: '말미잘',
    desc: '주위에서 흔히 볼 수 있는 말미잘이다.',
    img: (
      <img
        src={말미잘_1}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `005`,
    name: '애기 지렁용',
    desc: '전설의 동물 지렁용의 갓 태어난 모습',
    img: (
      <img
        src={지렁용_1}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `006`,
    name: '그윽한 지렁용',
    desc: '발톱과 부리가 돋아나 먹이를 좀 더 쉽게 사냥할 수 있게되었다.',
    img: (
      <img
        src={지렁용_2}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `007`,
    name: '지렁용',
    desc: '전설의 지렁용, 머리에 달린 뿔의 크기는 영험함을 나타낸다.',
    img: (
      <img
        src={지렁용_3}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
];
