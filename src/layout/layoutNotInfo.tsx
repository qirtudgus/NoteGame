import { Outlet } from 'react-router-dom';
import BackGround from '../components/BackGround';

const LayoutNotInfo = () => {
  return (
    <BackGround>
      <Outlet />
    </BackGround>
  );
};

export default LayoutNotInfo;
