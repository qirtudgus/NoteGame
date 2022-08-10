import BackHistoryBtn from './BackHistoryBtn';
import FastFowardBtn from './FastFowardBtn';
import HomeBtn from './HomeBtn';
import RefreshBtn from './RefreshBtn';

const btnArr = [BackHistoryBtn, FastFowardBtn, HomeBtn, RefreshBtn];

const HeaderBtnCollection = () => {
  return (
    <>
      <BackHistoryBtn corner></BackHistoryBtn>
    </>
  );
};

export default HeaderBtnCollection;
