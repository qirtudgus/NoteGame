import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import visible from '../img/visible.svg';
import visibleoff from '../img/visibleoff.svg';
import React from 'react';
import { Back } from './BtnMenu';
import { useSelector, useDispatch } from 'react-redux';
import { visible_on, visible_off } from '../modules/visibleState';
import { RootState } from '../modules/modules_index';
//이미지 사용
//https://velog.io/@shinwonse/React-styled-components%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80
const VisibleImg = styled.img.attrs({
  src: `${visible}`,
})`
  width: 30px;
  height: 30px;
`;

const VisibleOffImg = styled.img.attrs({
  src: `${visibleoff}`,
})`
  width: 30px;
  height: 30px;
`;

const DetailViewBtn = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isVisible = useSelector((state: RootState) => state.visibleState.isVisible) as boolean;
  return (
    <>
      {isVisible ? (
        <Back
          onClick={() => {
            dispatch(visible_off());
          }}
          title='마을로'
        >
          <VisibleOffImg alt='home' />
        </Back>
      ) : (
        <Back
          onClick={() => {
            dispatch(visible_on());
          }}
          title='마을로'
        >
          <VisibleImg alt='home' />
        </Back>
      )}
    </>
  );
};

export default React.memo(DetailViewBtn);
