import { Outlet } from 'react-router-dom';
import BackGround from '../components/BackGround';
import UserInfo from '../components/UserInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';

const Layout = () => {
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  return (
    <BackGround>
      <Outlet />
      {isLogin && <UserInfo></UserInfo>}
    </BackGround>
  );
};

export default Layout;
