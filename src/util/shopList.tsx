import 모남볼펜 from '../img/모남볼펜2.png';
import 하이테크 from '../img/하이테크.png';
import 컴퓨터용사인펜 from '../img/컴퓨터용사인펜.png';
import 보드마카 from '../img/보드마카2.png';
import 만년필 from '../img/만년필.png';
import 유성매직 from '../img/유성매직.png';
import 몽블랑마릴린먼로 from '../img/몽블랑마릴린먼로.png';

export interface pen {
  title: string;
  desc: string;
  level: string;
  ballPenName: string;
  Gold: number;
  weaponDamage: number;
  img: any;
  dungeonPenSpeed: number;
  penGamePenSpeed: number;
  rewardList: number[];
}
export const penObj: pen[] = [
  {
    title: '모남이 볼펜',
    desc: '그냥볼펜',
    level: '5',
    ballPenName: 'weapon1',
    Gold: 50,
    weaponDamage: 50,
    img: 모남볼펜,
    dungeonPenSpeed: 3.5,
    penGamePenSpeed: 500,
    rewardList: [100, 100, 300, 100, 100, 100],
  },
  {
    title: '하이테크 볼펜',
    desc: '하이테크입니다.',
    level: '5',
    ballPenName: 'weapon2',
    Gold: 50,
    weaponDamage: 500,
    img: 하이테크,
    dungeonPenSpeed: 5,
    penGamePenSpeed: 500,
    rewardList: [100, 200, 300, 400, 500, 600],
  },
  {
    title: '컴퓨터용 사인펜',
    desc: 'OMR카드를 가져와',
    level: '5',
    ballPenName: 'weapon3',
    Gold: 50,
    weaponDamage: 1000,
    img: 컴퓨터용사인펜,
    dungeonPenSpeed: 0.6,
    penGamePenSpeed: 500,
    rewardList: [300, 300, 600, 300, 600, 100],
  },
  {
    title: '보드마카',
    desc: '두툼한 보드마카',
    level: '5',
    ballPenName: 'weapon4',
    Gold: 50,
    weaponDamage: 1000,
    img: 보드마카,
    dungeonPenSpeed: 0.6,
    penGamePenSpeed: 500,
    rewardList: [500, 500, 500, 500, 500, 100],
  },
  {
    title: '만년필',
    desc: '기념품입니다.',
    level: '5',
    ballPenName: 'weapon5',
    Gold: 50,
    weaponDamage: 5000,
    img: 만년필,
    dungeonPenSpeed: 0.6,
    penGamePenSpeed: 500,
    rewardList: [100, 400, 300, 100, 500, 100],
  },
  {
    title: '몽블랑 마릴린 먼로',
    desc: '당대를 풍미한 뮤즈 마릴린 먼로를 기리는 에디션 제품.',
    level: '5',
    ballPenName: 'weapon6',
    Gold: 50,
    weaponDamage: 10000,
    img: 몽블랑마릴린먼로,
    dungeonPenSpeed: 0.6,
    penGamePenSpeed: 500,
    rewardList: [1000, 4000, 1000, 1000, 500, 1000],
  },
  {
    title: '유성매직',
    desc: '기념품입니다.',
    level: '5',
    ballPenName: 'weapon7',
    Gold: 50,
    weaponDamage: 10000,
    img: 유성매직,
    dungeonPenSpeed: 0.6,
    penGamePenSpeed: 500,
    rewardList: [1000, 4000, 1000, 1000, 500, 1000],
  },
];
