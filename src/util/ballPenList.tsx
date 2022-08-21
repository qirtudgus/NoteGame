import 모남볼펜 from '../img/모남볼펜.png';
import 하이테크 from '../img/하이테크.png';
import 컴퓨터용사인펜 from '../img/컴퓨터용사인펜.png';
import 보드마카 from '../img/보드마카2.png';
import 만년필 from '../img/만년필.png';
import 유성매직 from '../img/유성매직.png';

import 몽블랑마릴린먼로 from '../img/몽블랑마릴린먼로.png';

//https://yamoo9.gitbook.io/typescript/interface/index-signature
interface pen {
  [prop: string]: string;
}
export const ballPenList: pen = {
  weapon1: 모남볼펜,
  weapon2: 하이테크,
  weapon3: 컴퓨터용사인펜,
  weapon4: 보드마카,
  weapon5: 만년필,
  weapon6: 몽블랑마릴린먼로,
  weapon7: 유성매직,
};
