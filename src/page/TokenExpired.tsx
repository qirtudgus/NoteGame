import BtnMenu from '../components/BtnMenu';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../modules/login';
import BasicBtn from '../components/BasicBtn';
const TokenExpired = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutRequest = () => {
    dispatch(logout());
  };
  return (
    <>
      <p>토큰이 만료되었습니다. 다시 로그인해주세요!</p>

      <BasicBtn
        ButtonText='다시 로그인'
        OnClick={logOutRequest}
      ></BasicBtn>
    </>
  );
};

export default TokenExpired;
