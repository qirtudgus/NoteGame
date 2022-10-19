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
}
export const monsterArr: a[] = [
  {
    monsterNumber: `m00001`,
    name: '작은 슬라임',
    img: (
      <img
        src={슬라임_1}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00002`,
    name: '중간 슬라임',
    img: (
      <img
        src={슬라임_2}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00003`,
    name: '킹 슬라임',
    img: (
      <img
        src={슬라임_3}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00004`,
    name: '말미잘',
    img: (
      <img
        src={말미잘_1}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00005`,
    name: '작은 지렁용',
    img: (
      <img
        src={지렁용_1}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00006`,
    name: '중간 지렁용',
    img: (
      <img
        src={지렁용_2}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00007`,
    name: '큰 지렁용',
    img: (
      <img
        src={지렁용_3}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00008`,
    name: '큰 지렁용',
    img: (
      <img
        src={지렁용_3}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00009`,
    name: '큰 지렁용',
    img: (
      <img
        src={지렁용_3}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00010`,
    name: '큰 지렁용',
    img: (
      <img
        src={지렁용_3}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00011`,
    name: '큰 지렁용',
    img: (
      <img
        src={지렁용_3}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00012`,
    name: '큰 지렁용',
    img: (
      <img
        src={지렁용_3}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
  {
    monsterNumber: `m00013`,
    name: '큰 지렁용',
    img: (
      <img
        src={지렁용_3}
        alt='monster'
        title='몬스터'
      ></img>
    ),
  },
];
