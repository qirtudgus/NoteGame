import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import anime from 'animejs';

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
  width: 2px;
  height: 20px;
  background: #000;

  /* animation: ${animations} 0.5s ease-in-out infinite; //1초동안 선형 무한 속성값주기
  animation-play-state: running;
  animation-fill-mode: forwards;
  ${(props) =>
    props.ani &&
    css`
      animation-play-state: paused;
    `} */
`;

const Point2 = styled.div<test>`
  width: 2px;
  height: 20px;
  background: #000;
`;

const Btn = styled.button`
  cursor: pointer;
  width: 100px;
  height: 100px;
  margin-top: 100px;
`;

const AniTest = () => {
  const [aniTest, SetAniTest] = useState(false);

  // animation.play();
  useEffect(() => {
    let testPen = document.querySelector('#testPen') as HTMLElement;
    let testPen2 = document.querySelector('#testPen2') as HTMLElement;
    let btn = document.querySelector('#btn2') as HTMLElement;
    let btn2 = document.querySelector('#btn3') as HTMLElement;

    let animation = anime({
      targets: '#testPen2',
      translateX: 250,
      duration: 250,
      direction: 'alternate', //번갈아 재생
      loop: true, // number는 횟수 true는 무한
      easing: 'easeInOutSine',
      autoplay: false,
    });

    btn.addEventListener('click', () => {
      console.log(aniTest);
      animation.play();
      // animation.pause();
    });

    btn2.addEventListener('click', () => {
      let testPen2 = document.querySelector('#testPen2') as HTMLElement;
      animation.pause();
      let x = testPen2.getBoundingClientRect().x;
      console.log(x);
    });

    document.addEventListener('click', function (event) {
      var x = event.clientX;
      var y = event.clientY;
      var coords = 'X coords: ' + x + ', Y coords: ' + y;
      console.log(coords);
    });

    // testPen.addEventListener('animationend', function (event) {
    //   const svgRect = this.getBoundingClientRect();
    //   console.log(svgRect);
    // });

    // testPen.addEventListener('animationcancel', function (event) {
    //   const svgRect = this.getBoundingClientRect();
    //   console.log(svgRect);
    // });

    // testPen.addEventListener('animationstart', function (event) {
    //   const svgRect = this.getBoundingClientRect();
    //   //   console.log(svgRect); // 정상
    // });
    // testPen.addEventListener('animationiteration', function (event) {
    //   const svgRect = this.getBoundingClientRect().x;
    //   //   console.log(svgRect); // 정상
    // });
  }, []);

  function coordsFunc2(e: any) {
    let testPen = document.querySelector('#testPen2') as HTMLElement;
    const svgRect = testPen.getBoundingClientRect().x;
    console.log(svgRect); // 정상
  }

  return (
    <>
      <Point2
        id='testPen2'
        ani={aniTest}
      ></Point2>

      <Btn id='btn2'>anime play</Btn>
      <Btn id='btn3'>stop</Btn>
    </>
  );
};

export default AniTest;
