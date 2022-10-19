import React, { useEffect, useMemo, useState } from 'react';
import customAxios from '../util/axios';
import styled, { css } from 'styled-components';
import BtnMenu from '../components/BtnMenu';
import 왼쪽화살표 from '../img/왼쪽화살표.svg';
import 오른쪽화살표 from '../img/오른쪽화살표.svg';
import 줌 from '../img/줌.svg';
import 엑스 from '../img/엑스.svg';

import { monsterArr } from '../util/dungeonMonsterList';
interface a {
  userList?: any;
  bar?: any;
  active?: boolean;
  myranking?: boolean;
}

const PageBtn = styled.button<a>`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: none;
  font-size: 20px;
  ${(props) =>
    props.active &&
    css`
      background: #ffbc26;
      color: #000;
      font-weight: bold;
    `}
  &:hover {
    outline: 2px solid #ffbc26;
    outline-offset: -3px;
  }
`;

const BtnWrap = styled.div`
  position: absolute;
  bottom: 45px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const PageMinWidth = styled.div`
  display: flex;
  justify-content: center;
  min-width: 300px;
`;

const CollectionWrap = styled.div`
  top: 20px;
  position: relative;
  width: 93%;
  height: 565px;
  /* background: green; */
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;
const CardWrap = styled.div`
  width: 225px;
  margin-left: 10px;

  &:nth-child(1) {
    margin-left: 0px;
  }
  &:nth-child(5) {
    margin-left: 0px;
  }
  height: 48%;
  background: #f1d473;
  border-radius: 5px;
  box-shadow: 2px 2px 3px 2px rgb(0 0 0 / 30%);
`;
const CardImg = styled.div`
  width: 225px;
  height: 200px;
  border-radius: 5px 5px 0 0;
  background: #fff;
  display: flex;
  justify-content: center;
  position: relative;
  & img {
    width: 200px;
  }
  & button {
    position: absolute;
    bottom: 0px;
    left: 5px;
    width: 30px;
    height: 30px;
    background: none;
  }

  & button img {
    width: 100%;
  }
`;
const CardImgMissing = styled.div`
  width: 225px;
  height: 200px;
  border-radius: 5px 5px 0 0;
  background: #333;
  display: flex;
  justify-content: center;
  & img {
    width: 200px;
  }
`;
const CardTitle = styled.p`
  width: 225px;
  height: 35px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CardCount = styled.p`
  width: 225px;
  height: 35px;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MonsterDetailModal = styled.div`
  width: 1000px;
  height: 600px;
  background: #fff;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;

const MonsterDetailImg = styled.div`
  width: 500px;
  height: 600px;
  display: flex;
  align-items: center;
  & img {
    width: 100%;
  }
`;
const MonsterDetailInfo = styled.div`
  width: 500px;
  height: 550px;
  padding-top: 50px;
  & h1 {
    margin: 0 20px;
    font-size: 2.5rem;
  }
  & h3 {
    font-size: 1.5rem;
    margin: 40px 20px 20px;
  }
  & p {
    margin: 20px 20px;
    font-size: 1.6rem;
    word-break: keep-all;
    line-height: 1.9rem;
  }
`;

const BgWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.2);
  left: 0;
  top: 0;
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  & img {
    width: 35px;
  }
`;

const MonsterCollection = () => {
  //보여줄 페이지 사이즈 페이지당 8마리
  const PAGE_SIZE = 8;
  //총 페이지 수
  let total: number = 0;
  //리스트에 따른 페이지 갯수
  const [pages, setPages] = useState<number[]>([]);
  //전체 랭킹에 보여줄 10개의 리스트
  const [list, setList] = useState({ collection: [], count: [] });
  //페이지 맞게 잘라낸 몬스터 도감 8개 리스트
  interface a {
    name: string;
    img: JSX.Element;
  }
  const [monsterList, setMonsterList] = useState<a[]>();
  //현재 보여주고있는 페이지번호
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  //현재 보여주고있는 페이지버튼 리스트
  const [pageList, setPageList] = useState<number[]>([]);
  //몬스터 세부정보 모달창 여부
  const [monsterDetailView, setMonsterDetailView] = useState(false);
  //몬스터 세부정보 콘텐츠
  const [monsterDetailContent, setMonsterDetailContent] = useState({
    monsterNumber: '',
    name: '',
    img: '',
    desc: '',
    count: '',
  });

  const call = async (currentPageNum: number): Promise<void> => {
    let payloadObj = await customAxios('post', '/monstercollection/joins', {
      currentPageNum,
    }).then((res) => {
      // 10개의 게시글을 불러온다.
      console.log(res.data);
      return res.data;
    });
    setList(() => payloadObj);
    //토탈페이지수를 변수에 할당해준다.
    total = payloadObj.listNum;
    //페이지 정수를 받아와 배열 생성 후 setState해준다.
    //https://hjcode.tistory.com/73
    let pagesNum = Array.from({ length: payloadObj.listNum }, (v, i) => i);
    console.log(pagesNum);
    setPages([...pagesNum]);
    //몬스터리스트 세팅
    let monsterArrResult = monsterArr.slice((currentPageNum - 1) * 8, (currentPageNum - 1) * 8 + 7 + 1); // 0~7 까지 8개를 넘겨준다.
    setMonsterList(monsterArrResult);
    createPageList(currentPageNum);
  };

  const createPageList = (currentPage: number) => {
    let arr: any = [];
    //현재 페이지와 페이즈사이즈를 나눠 1이 남았을 때 이 후 번호의 배열을 생성
    if (currentPage % PAGE_SIZE === 1) {
      let idx = 1; // 이 수를 current에 더 해준다.
      arr = [currentPage];

      while (currentPage + idx <= total && arr.length < PAGE_SIZE) {
        arr.push(currentPage + idx);
        idx++;
      }
      setPageList([...arr]);
    } else if (currentPage % PAGE_SIZE === 0) {
      let idx = 1;
      arr = [currentPage];
      while (arr.length < PAGE_SIZE) {
        arr.unshift(currentPage - idx);
        idx++;
      }
      setPageList([...arr]);
    }
  };

  const DetailViewToggle = (monsterList: any, count: number) => {
    setMonsterDetailContent({ ...monsterList, count });
    setMonsterDetailView((prev) => !prev);
  };

  //첫 데이터를 불러온다.
  useEffect(() => {
    call(currentPageNum);
  }, [currentPageNum]);

  return (
    <>
      {monsterDetailView && (
        <BgWrap>
          <MonsterDetailModal>
            <MonsterDetailImg>{monsterDetailContent.img}</MonsterDetailImg>
            <MonsterDetailInfo>
              <h3>이름</h3>
              <h1>{monsterDetailContent.name}</h1>
              <h3>설명</h3>
              <p>{monsterDetailContent?.desc}</p>
              <h3>잡은 횟수</h3>
              <p>{monsterDetailContent?.count}</p>
            </MonsterDetailInfo>

            <Close onClick={() => setMonsterDetailView(false)}>
              <img
                src={엑스}
                alt='닫기'
              />
            </Close>
          </MonsterDetailModal>
        </BgWrap>
      )}
      <CollectionWrap>
        {list.collection.map((i, index) => (
          <CardWrap key={index}>
            {list.collection[index] >= 1 ? (
              <>
                <CardImg>
                  {monsterList![index].img}
                  <button onClick={() => DetailViewToggle(monsterList![index], list.count[index])}>
                    <img
                      src={줌}
                      alt='상세정보'
                    ></img>
                  </button>
                </CardImg>
                <CardTitle>{monsterList![index].name}</CardTitle>
              </>
            ) : (
              <>
                <CardImgMissing></CardImgMissing>
                <CardTitle>???</CardTitle>
              </>
            )}

            <CardCount>잡은 횟수 : {list.count[index]}</CardCount>
          </CardWrap>
        ))}
      </CollectionWrap>

      <BtnWrap>
        <PageBtn
          disabled={currentPageNum === 1}
          data-prev='backward'
          onClick={() => {
            setCurrentPageNum((prev) => prev - 1);
          }}
        >
          <img
            src={왼쪽화살표}
            alt='뒤로'
          ></img>
        </PageBtn>
        <PageMinWidth>
          {pageList!.map((i: any, index: any) => (
            <PageBtn
              key={i}
              active={currentPageNum === i}
              onClick={(e) => {
                setCurrentPageNum(i);
              }}
            >
              {i}
            </PageBtn>
          ))}
        </PageMinWidth>
        <PageBtn
          data-prev='forward'
          disabled={currentPageNum === pages.length}
          onClick={() => {
            setCurrentPageNum((prev) => prev + 1);
          }}
        >
          <img
            src={오른쪽화살표}
            alt='앞으로'
          ></img>
        </PageBtn>
      </BtnWrap>

      <BtnMenu BackHistory></BtnMenu>
    </>
  );
};

export default MonsterCollection;
