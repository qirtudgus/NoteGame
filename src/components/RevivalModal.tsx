import styled from 'styled-components';
const BgWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
`;

const Bg = styled.div`
  border-radius: 20px;
  width: 600px;
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
`;

const RevivalModal = (props: any) => {
  return (
    <BgWrap>
        <Bg>
            {props.children}
        </Bg>

    </BgWrap>
  );
};

export default RevivalModal;
