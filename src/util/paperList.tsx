import paper1 from '../img/paper/paper1.png';
import paper2 from '../img/paper/paper2.png';
import paper3 from '../img/paper/paper3.png';
import paper4 from '../img/paper/paper4.png';
import paper5 from '../img/paper/paper5.png';
import paper6 from '../img/paper/paper6.png';
import paper7 from '../img/paper/paper7.png';
import paper8 from '../img/paper/paper8.png';

interface paper {
  title: string;
  desc: string;
  paperName: string;
  img: string;
  Gold: number;
  Hp: number;
}

export const paperObj: paper[] = [
  { title: '종이', desc: '평범한 종이', paperName: 'paper1', img: paper1, Gold: 100, Hp: 500 },
  { title: '줄 종이', desc: '어디에 붙이려했던 종이일까?', paperName: 'paper2', img: paper2, Gold: 20000, Hp: 1000 },
  {
    title: '고급져보이는 종이',
    desc: '고급져보이는 색이지만 사실 물이 묻어 눅눅해진 종이다..',
    paperName: 'paper3',
    img: paper3,
    Gold: 60000,
    Hp: 3000,
  },
  { title: '볼록 종이', desc: '올록볼록한 독특한 종이', paperName: 'paper4', img: paper4, Gold: 100000, Hp: 5000 },
  { title: '꾸겨진 종이', desc: '주머니 속에 꼬깃꼬깃~', paperName: 'paper5', img: paper5, Gold: 150000, Hp: 9000 },
  { title: '클립 종이', desc: '나는 두겹이라 더 튼튼해!', paperName: 'paper6', img: paper6, Gold: 200000, Hp: 15000 },
  {
    title: '두루마리 종이',
    desc: '한평생 말려있다가 드디어 펼쳐진 종이',
    paperName: 'paper7',
    img: paper7,
    Gold: 300000,
    Hp: 20000,
  },
  {
    title: '고대 종이',
    desc: '만든지 몇년이 지난지 알 수 없는 오래된 종이',
    paperName: 'paper8',
    img: paper8,
    Gold: 500000,
    Hp: 50000,
  },
];
