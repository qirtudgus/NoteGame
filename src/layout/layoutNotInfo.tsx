import { Outlet } from 'react-router-dom';
import BackGround from '../components/BackGround';
import UserInfo from '../components/userInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';

const LayoutNotInfo = () => {
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  return (
    <BackGround>
      <Outlet />
    </BackGround>
  );
};

export default LayoutNotInfo;