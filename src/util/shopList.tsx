import 모남볼펜 from '../img/pen/모남볼펜2.png';
import 하이테크 from '../img/pen/하이테크.png';
import 컴퓨터용사인펜 from '../img/pen/컴퓨터용사인펜.png';
import 보드마카 from '../img/pen/보드마카2.png';
import 만년필 from '../img/pen/만년필.png';
import 유성매직 from '../img/pen/유성매직.png';
import 몽블랑마릴린먼로 from '../img/pen/몽블랑마릴린먼로.png';

export interface pen {
  title: string;
  desc: string;
  level: string;
  ballPenName: string;
  Gold: number;
  weaponDamage: number;
  img: string;
  dungeonPenSpeed: number;
  penGamePenSpeed: number;
  rewardList: number[];
}
export const penObj: pen[] = [
  {
    title: '모남이 볼펜',
    desc: '그냥볼펜',
    level: '1',
    ballPenName: 'weapon1',
    Gold: 50,
    weaponDamage: 50,
    img: 모남볼펜,
    dungeonPenSpeed: 500,
    penGamePenSpeed: 500,
    rewardList: [50, 100, 500, 50, 300, 100],
  },
  {
    title: '하이테크 볼펜',
    desc: '하이테크입니다.',
    level: '3',
    ballPenName: 'weapon2',
    Gold: 50000,
    weaponDamage: 1000,
    img: 하이테크,
    dungeonPenSpeed: 500,
    penGamePenSpeed: 500,
    rewardList: [100, 100, 100, 100, 100, 700],
  },
  {
    title: '컴퓨터용 사인펜',
    desc: 'OMR카드를 가져와',
    level: '5',
    ballPenName: 'weapon3',
    Gold: 100000,
    weaponDamage: 2000,
    img: 컴퓨터용사인펜,
    dungeonPenSpeed: 500,
    penGamePenSpeed: 500,
    rewardList: [200, 200, 1500, 200, 200, 200],
  },
  {
    title: '보드마카',
    desc: '두툼한 보드마카',
    level: '10',
    ballPenName: 'weapon4',
    Gold: 250000,
    weaponDamage: 2000,
    img: 보드마카,
    dungeonPenSpeed: 500,
    penGamePenSpeed: 500,
    rewardList: [2000, 500, 500, 500, 500, 500],
  },
  {
    title: '유성매직',
    desc: '기념품입니다.',
    level: '15',
    ballPenName: 'weapon5',
    Gold: 400000,
    weaponDamage: 5000,
    img: 유성매직,
    dungeonPenSpeed: 500,
    penGamePenSpeed: 500,
    rewardList: [3500, 500, 500, 500, 500, 500],
  },
  {
    title: '만년필',
    desc: '기념품입니다.',
    level: '20',
    ballPenName: 'weapon6',
    Gold: 1000000,
    weaponDamage: 10000,
    img: 만년필,
    dungeonPenSpeed: 500,
    penGamePenSpeed: 500,
    rewardList: [4000, 800, 800, 800, 800, 800],
  },

  {
    title: '몽블랑 마릴린 먼로',
    desc: '당대를 풍미한 뮤즈 마릴린 먼로를 기리는 에디션 제품.',
    level: '25',
    ballPenName: 'weapon7',
    Gold: 2000000,
    weaponDamage: 30000,
    img: 몽블랑마릴린먼로,
    dungeonPenSpeed: 500,
    penGamePenSpeed: 500,
    rewardList: [10000, 1000, 1000, 1000, 1000, 1000],
  },
];
