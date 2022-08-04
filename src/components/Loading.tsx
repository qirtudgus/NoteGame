import styled, { css, keyframes } from 'styled-components';

const lds_ellipsis1 = keyframes`
  0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  `;

const lds_ellipsis3 = keyframes`
  0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  `;

const lds_ellipsis2 = keyframes`
  0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  `;

const IdsEllipsis = styled.div`
  z-index: 1000;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & > div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  & div:nth-child(1) {
    left: 8px;
    animation: ${lds_ellipsis1} 0.6s infinite;
  }

  & div:nth-child(2) {
    left: 8px;
    animation: ${lds_ellipsis2} 0.6s infinite;
  }
  & div:nth-child(3) {
    left: 32px;
    animation: ${lds_ellipsis2} 0.6s infinite;
  }
  & div:nth-child(4) {
    left: 56px;
    animation: ${lds_ellipsis3} 0.6s infinite;
  }
`;

interface loading {
  pointer?: boolean;
}

const LoadingWrap = styled.div<loading>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  display:flex;
  justify-content:center;
  align-items: center;

      pointer-events: none;

`;

const Loading = (props: any) => {
  return (
    <>
      <LoadingWrap>
        <IdsEllipsis>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </IdsEllipsis>
      </LoadingWrap>
    </>
  );
};

export default Loading;
