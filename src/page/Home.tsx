import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import BtnMenu from '../components/BtnMenu';
import FooterMenu from '../components/FooterMenu';
import React from 'react';
import CharacterBox from '../components/CharacterBox';
const Home = () => {
  const isTokenExPired = useSelector((state: RootState) => state.login.tokenExpired);

  return (
    <>
      <BtnMenu LogOut></BtnMenu>

      <CharacterBox></CharacterBox>
      <FooterMenu></FooterMenu>
    </>
  );
};

export default React.memo(Home);
