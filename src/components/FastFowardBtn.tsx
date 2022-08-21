import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import FastArrow from '../img/빠른재생.svg';
import {Back} from './BtnMenu';

//이미지 사용
//https://velog.io/@shinwonse/React-styled-components%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80
const ArrowImg = styled.img.attrs({
  src: `${FastArrow}`,
})`
  width: 30px;
  height: 30px;
`;

const FastForwardBtn = (props: any) => {
  return (
    <>
      <Back {...props} onClick={props.func} title='빠른재생'>
        {props.text}x
        <ArrowImg alt='빠른재생' />
      </Back>
    </>
  );
};

export default React.memo(FastForwardBtn);
