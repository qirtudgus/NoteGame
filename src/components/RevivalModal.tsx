import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { modal_failure } from '../modules/modalState';
import 엑스 from '../img/엑스.svg';
import { ReactNode } from 'react';

const BgWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.2);
  left: 0;
  top: 0;
`;

const Bg = styled.div`
  border-radius: 20px;
  width: 500px;
  height: 300px;
  background: ${(props) => props.color || '#eee'};
  margin: 50px auto;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  user-select: none;
  font-size: 1.2rem;
  & > p {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  & .result {
    background: #ffbc26;
    padding: 9px 30px 5px 30px;
    border-radius: 10px;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  & img {
    width: 35px;
  }
`;

interface RevivalModalInterface {
  close?: boolean;
  OnClick?: () => void;
  children?: ReactNode;
}

const RevivalModal = ({ close, OnClick, children }: RevivalModalInterface) => {
  const dispatch = useDispatch();
  function closeModal() {
    dispatch(modal_failure());
  }
  return (
    <BgWrap>
      <Bg>
        {close && (
          <Close onClick={OnClick || closeModal}>
            <img
              src={엑스}
              alt='닫기'
            />
          </Close>
        )}

        {children}
      </Bg>
    </BgWrap>
  );
};

export default RevivalModal;
