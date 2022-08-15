import 모남볼펜 from '../img/모남볼펜.png';
import 하이테크 from '../img/하이테크.png';
import 컴퓨터용사인펜 from '../img/컴퓨터용사인펜.png';
import 보드마카 from '../img/보드마카2.png';

interface pen {
  title:string,
  desc:string,
  level:string,
  ballPenName:string,
  Gold:number,
  weaponDamage:number,
  img?:any;
  penSpeed?:number;
}
export const penObj:pen[] = [
  {
    title: '모남이 볼펜',
    desc: '그냥볼펜',
    level: '5',
    ballPenName: 'weapon1',
    Gold: 0,
    weaponDamage:50,
    img:모남볼펜,
    penSpeed:0.5,
  },
  {
    title: '하이테크 볼펜',
    desc: '하이테크입니다.',
    level: '5',
    ballPenName: 'weapon2',
    Gold: 10000,
    weaponDamage:500,
    img:하이테크,
    penSpeed:2,

  },
  {
    title: '컴퓨터용 사인펜',
    desc: 'OMR카드를 가져와',
    level: '5',
    ballPenName: 'weapon3',
    Gold: 10000,
    weaponDamage:1000,
    img:컴퓨터용사인펜,
    penSpeed:5,

  },
  {
    title: '보드마카',
    desc: '두툼한 보드마카',
    level: '5',
    ballPenName: 'weapon4',
    Gold: 10000,
    weaponDamage:1000,
    img:보드마카,

  },
  {
    title: '5',
    desc: '기념품입니다.',
    level: '5',
    ballPenName: 'weapon5',
    Gold: 10000000,
    weaponDamage:500,

  },
  {
    title: '6',
    desc: '기념품입니다.',
    level: '5',
    ballPenName: 'weapon6',
    Gold: 10000,
    weaponDamage:500,

  },
  {
    title: '7',
    desc: '기념품입니다.',
    level: '5',
    ballPenName: 'weapon7',
    Gold: 10000000,
    weaponDamage:500,

  },
  {
    title: '8',
    desc: '기념품입니다.',
    level: '5',
    ballPenName: 'weapon8',
    Gold: 10000,
    weaponDamage:500,

  },
  {
    title: '9',
    desc: '기념품입니다.',
    level: '5',
    ballPenName: 'weapon9',
    Gold: 10000000,
    weaponDamage:500,

  },
  {
    title: '10',
    desc: '기념품입니다.',
    level: '5',
    ballPenName: 'weapon10',
    Gold: 10000,
    weaponDamage:500,

  },
];
