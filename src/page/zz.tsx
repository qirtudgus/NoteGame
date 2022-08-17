// //https://gisastudy.tistory.com/112

// import { useState } from 'react';
// import styled, { css } from 'styled-components';

// interface a {
//   active: boolean;
// }

// const Button = styled.button<a>`
//   width: 50px;
//   height: 50px;
//   ${(props) =>
//     props.active &&
//     css`
//       background: #e5005a;
//     `}
// `;

// const ZZ = () => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const start = 0;
//   const [currPage, setCurrPage] = useState<number>(0);
//   const pageCount = 36;

//   const MAX_PAGE_COUNT = 10; // MAX_PAGE_COUNT -> 한번에 보여지는 페이지 수,
//   let resultList: any = [];

//   function getPaginationArray(currPage: any, pageCount: any) {
//     // 1, 11, 21 ... 페이지가 선택될 때 ,
//     // 1~10, 11~20, 21~30 ... 리스트 생성
//     //아래 조건은 curr을 10으로 나눴을때 1이 나오면
//     // 1을 더해주기때문에 10(11페이지)에서 호출됨
//     if ((currPage + 1) % MAX_PAGE_COUNT === 1) {
//       // idx 1 선언
//       let idx = 1;
//       // 배열에 현재 페이지값을 넣음 (10)//0부터 시작해서 11을 뜻함
//       resultList = [currPage];
//       // 0보다 10이 작을 때까지(9까지), && (11 + 1++)가 22보다 작을때까지 큰게 true일동안 반복
//       // 피연산자가 먼저 MAX_PAGE_COUNT에 false가 나와 중단된다.
//       while (resultList.length < MAX_PAGE_COUNT && currPage + idx < pageCount) {
//         console.log(currPage);
//         console.log(idx);
//         let a = currPage + idx;
//         console.log(a);
//         resultList.push(a);
//         //idx에 1을 더해줌
//         idx++;
//       }
//       console.log(resultList);

//       // 9, 19, 29 ... 페이지가 선택될 때,
//       // 1~10, 11~20, 21~30 ... 리스트 생성
//     } else if (currPage % MAX_PAGE_COUNT === MAX_PAGE_COUNT - 1) {
//       let idx = 1;
//       resultList = [currPage];
//       while (resultList.length < MAX_PAGE_COUNT) {
//         resultList.unshift(currPage - idx);
//         idx++;
//       }
//     }
//     console.log(resultList);
//     return resultList;
//   }

//   const onClickPage = (num: any) => {
//     console.log(currPage);
//     setCurrPage(num);
//   };

//   return (
//     <>
//       <button
//         onClick={() => currPage > 0 && onClickPage(currPage - 1)}
//         disabled={currPage <= 0}
//       >
//         이전페이지
//       </button>

//       {getPaginationArray(currPage, pageCount).map((page: any) => {
//         return (
//           <Button
//             onClick={() => onClickPage(page)}
//             key={`page-button-${page}`}
//             active={page === currPage}
//           >
//             {page + 1}
//           </Button>
//         );
//       })}

//       <button
//         onClick={() => currPage < pageCount - 1 && onClickPage(currPage + 1)}
//         disabled={currPage >= pageCount - 1}
//       >
//         다음페이지
//       </button>
//     </>
//   );
// };

// export default ZZ;
export default {};
