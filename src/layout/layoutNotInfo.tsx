import { Outlet } from 'react-router-dom';
import BackGround from '../components/BackGround';
import TokenExpired from '../page/TokenExpired';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
const LayoutNotInfo = () => {
  const isTokenExpired = useSelector((state: RootState) => state.login.tokenExpired);

  return (
    <BackGround>
      {isTokenExpired ? (
        <TokenExpired></TokenExpired>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </BackGround>
  );
};

export default LayoutNotInfo;
