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
  { title: '종이', desc: '평범한 종이', paperName: 'paper2', img: paper2, Gold: 100, Hp: 500 },
  { title: '종이', desc: '평범한 종이', paperName: 'paper3', img: paper3, Gold: 100, Hp: 500 },
  { title: '종이', desc: '평범한 종이', paperName: 'paper4', img: paper4, Gold: 100, Hp: 500 },
  { title: '종이', desc: '평범한 종이', paperName: 'paper5', img: paper5, Gold: 100, Hp: 500 },
  { title: '종이', desc: '평범한 종이', paperName: 'paper6', img: paper6, Gold: 100, Hp: 500 },
  { title: '종이', desc: '평범한 종이', paperName: 'paper7', img: paper7, Gold: 100, Hp: 500 },
  { title: '종이', desc: '평범한 종이', paperName: 'paper8', img: paper8, Gold: 100, Hp: 500 },
];
