import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
interface test {
  ani: boolean;
}

// PlayPenGame에서 사용되는 애니메이션
const animations = keyframes`
      0% {
        transform:translate(-10em);
      }
    50%{
      transform:translate(10em); 
     }
      100%{
        transform:translate(-10em);
      }
    `;

const Point = styled.div<test>`
  width: 5px;
  height: 5px;
  background: #000;

  animation: ${animations} 1s ease-in-out infinite; //1초동안 선형 무한 속성값주기
  animation-play-state: running;
  animation-fill-mode: forwards;
  ${(props) =>
    props.ani &&
    css`
      animation-play-state: paused;
    `}
`;

const Btn = styled.div`
  width: 100px;
  height: 100px;
  background: #eee;
`;

const AniTest = () => {
  const [aniTest, SetAniTest] = useState(false);

  //애니메이션에 상관없이 요소이 기본위치를 불러오는 함수
  function getOffset(element: any) {
    var offsetLeft = 0;
    var offsetTop = 0;

    while (element) {
      offsetLeft += element.offsetLeft;
      offsetTop += element.offsetTop;

      element = element.offsetParent;
    }

    return [offsetLeft, offsetTop];
  }

  useEffect(() => {
    let testPen = document.querySelector('#testPen') as HTMLElement;

    document.addEventListener('click', function (event) {
      var x = event.clientX;
      var y = event.clientY;
      var coords = 'X coords: ' + x + ', Y coords: ' + y;
      console.log(coords);
    });

    testPen.addEventListener('animationend', function (event) {
      const svgRect = this.getBoundingClientRect();
      console.log(svgRect);
    });

    testPen.addEventListener('animationcancel', function (event) {
      const svgRect = this.getBoundingClientRect();
      console.log(svgRect);
    });

    testPen.addEventListener('animationstart', function (event) {
      const svgRect = this.getBoundingClientRect();
      //   console.log(svgRect); // 정상
    });
    testPen.addEventListener('animationiteration', function (event) {
      const svgRect = this.getBoundingClientRect();
      //   console.log(svgRect); // 정상
    });
  }, []);

  return (
    <>
      <Point
        id='testPen'
        ani={aniTest}
      ></Point>
      <Btn
        onClick={() => {
          let testPen = document.querySelector('#testPen') as HTMLElement;
          console.log(testPen.getBoundingClientRect());
          SetAniTest((ani) => !ani);
        }}
      >
        멈춰라!!
      </Btn>
    </>
  );
};

export default AniTest;
