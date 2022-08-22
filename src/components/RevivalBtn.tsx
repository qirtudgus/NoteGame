import styled from 'styled-components';
import backArrow from '../img/뒤로가기.svg';
import {Back} from './BtnMenu';




const ReP = styled.p`
font-weight:bold;
font-size:1.7rem;
`

const RevivalBtn = (props: any) => {

  return (
    <>
      <Back
        onClick={props.OnClick}
        title='환생하기'
      >
        <ReP>환생</ReP>
      </Back>
    </>
  );
};

export default RevivalBtn;
