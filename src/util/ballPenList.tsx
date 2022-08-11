import 모남볼펜 from '../img/모남볼펜.png';
import 하이테크 from '../img/하이테크.png';
//https://yamoo9.gitbook.io/typescript/interface/index-signature
interface pen {
  [prop: string]: string;
}
export const ballPenList: pen = { weapon1: 모남볼펜, weapon2: 하이테크 };
