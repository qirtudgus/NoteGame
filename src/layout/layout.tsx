import { Outlet } from 'react-router-dom';
import BackGround from '../components/BackGround';
const Layout = () => {
  return (
<BackGround>
        <Outlet />
      </BackGround>
  );
};

export default Layout