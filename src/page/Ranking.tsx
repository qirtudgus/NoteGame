import React, { useCallback, useEffect, useState } from 'react';
import BtnMenu from '../components/BtnMenu';
import customAxios from '../util/axios';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { isArrayBindingPattern } from 'typescript';

const RankingWrap = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const RankingTabWrap = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
`;

interface a {
  userList?: any;
  bar?: any;
  active?: boolean;
  myranking?: boolean;
}

const RankingTab = styled.div<a>`
  width: 50%;
  height: 70px;
  background: #eee;
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.active &&
    css`
      color: #000;
      background: #fff;
    `}
`;

const RangkingPage = styled.div`
  width: 100%;
  height: 100%;
  min-height: 550px;
`;

const RankingTable = styled.table`
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;
const RankingTbody = styled.tbody``;

const RankingTr = styled.tr<a>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${(props) =>
    props.bar &&
    css`
      font-weight: bold;
      font-size: 1.3rem;
    `}
  ${(props) =>
    props.myranking &&
    css`
      font-weight: bold;
      background: #e5005a;
    `}
`;

const RankingTh = styled.th<a>`
  width: 100%;
  ${(props) =>
    props.myranking &&
    css`
      font-weight: bold;
      background: #e5005a;
    `}
`;

const PageBtn = styled.button<a>`
  width: 30px;
  height: 30px;
  border: 1px solid#555;
  ${(props) =>
    props.active &&
    css`
      border: 5px solid#555;
      background: #555;
      color: #fff;
    `}
`;

const PrevBtn = styled.button<a>`
  width: 40px;
  height: 40px;
  border: 1px solid#555;
`;

const Ranking = () => {
  const userId = useSelector((state: RootState) => state.login.id);

  //어떤 순위 보여주는지
  const [show, setShow] = useState(true);

  //내 랭킹
  const [myList, setMyList] = useState<[]>([]);

  //페이지 사이즈
  const PAGE_SIZE = 3;

  //관리할 페이지 사이즈 // 현재 12
  const [totalPages, setTotalPages] = useState<number>(0);

  //리스트에 따른 페이지 갯수
  const [pages, setPages] = useState<number[]>([]);
  //전체 랭킹 보여줄 10개의 리스트
  const [list, setList] = useState<[]>([]);
  //현재 보여줄 페이지번호
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  //현재 보여줄 페이지리스트들
  const [pageList, setPageList] = useState([1, 2, 3]);

  const call = async (currentPageNum: number): Promise<void> => {
    let payloadObj = await customAxios('post', '/ranking/allranking', {
      currentPageNum,
    }).then((res) => {
      // 10개의 게시글을 불러온다.
      return res.data.payload;
    });
    setList(() => payloadObj.data);
    setTotalPages(() => payloadObj.listNum);
    //페이지 정수를 받아와 배열 생성 후 setState해준다.
    //https://hjcode.tistory.com/73
    let pagesNum = Array.from({ length: payloadObj.listNum }, (v, i) => i);
    setPages([...pagesNum]);
  };

  const callmyranking = async (userId: string | number | undefined) => {
    if (userId === undefined) return;
    let result = await customAxios('post', '/ranking/myranking/', {
      userId,
    }).then((res) => {
      console.log(res.data);
      return res.data.rangeArr;
    });
    setMyList(() => result);
  };

  //첫 데이터를 불러온다.
  useEffect(() => {
    call(currentPageNum);
    foo(currentPageNum, PAGE_SIZE);
  }, [currentPageNum]);

  let arr: any = [];
  const foo = (currentPage: number, pageSize: number) => {
    // console.log(currentPage);
    // console.log(pageSize);
    // console.log(currentPage % pageSize);
    // console.log(totalPages);
    if (currentPage === 1) return;
    //4 7 10 13 마다 1이남고 이때 페이지를 만들어줘야한다.. 456 789
    if (currentPage % pageSize === 1) {
      // alert('1이 남음');
      //현재 페이지의 +2까지의 번호를 만들어 배열을 생성 후 setList해준다..
      let idx = 1; // 이 수를 current에 더 해준다.
      arr = [currentPage];
      while (currentPage + idx <= totalPages && arr.length < pageSize) {
        arr.push(currentPage + idx);
        idx++;
        console.log(pageSize);
        console.log(arr.length);
      }

      // const a = currentPage + 1;
      // const b = currentPage + 2;
      // console.log(a, b);
      // arr = [currentPage];
      // arr.push(a, b);
      setPageList([...arr]);
    } else if (currentPage % pageSize === 0) {
      const a = currentPage - 1;
      const b = currentPage - 2;
      arr = [currentPage];
      arr.unshift(b, a);
      setPageList([...arr]);
    }

    console.log(arr);
  };
  return (
    <>
      <BtnMenu BackHistory></BtnMenu>
      <RankingWrap>
        <RankingTabWrap>
          <RankingTab
            active={show}
            onClick={() => {
              setShow(() => true);
            }}
          >
            전체 순위
          </RankingTab>
          <RankingTab
            active={!show}
            onClick={() => {
              callmyranking(userId);
              setShow(() => false);
            }}
          >
            나의 순위
          </RankingTab>
        </RankingTabWrap>
        <RangkingPage>
          <RankingTable>
            <RankingTbody>
              <RankingTr bar>
                <th>순위</th>
                <th>닉네임</th>
                <th>레벨</th>
                <th>최고층</th>
              </RankingTr>
              {show ? (
                <>
                  {list!.map((i: any, index: any) => (
                    <React.Fragment key={index}>
                      {i.ID === userId ? (
                        <RankingTr myranking key={i.ID}>
                          <RankingTh>{i.ranking}</RankingTh>
                          <RankingTh>{i.ID}</RankingTh>
                          <RankingTh>{i.Level}</RankingTh>
                          <RankingTh>{i.DungeonFloor}</RankingTh>
                        </RankingTr>
                      ) : (
                        <RankingTr key={i.ID}>
                          <RankingTh>{i.ranking}</RankingTh>
                          <RankingTh>{i.ID}</RankingTh>
                          <RankingTh>{i.Level}</RankingTh>
                          <RankingTh>{i.DungeonFloor}</RankingTh>
                        </RankingTr>
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  {myList!.map((i: any, index: any) => (
                    <React.Fragment key={index}>
                      {i.Id === userId ? (
                        <RankingTr myranking key={i.Id}>
                          <RankingTh>{i.ranking}</RankingTh>
                          <RankingTh>{i.Id}</RankingTh>
                          <RankingTh>{i.Level}</RankingTh>
                          <RankingTh>{i.DungeonFloor}</RankingTh>
                        </RankingTr>
                      ) : (
                        <RankingTr key={i.Id}>
                          <RankingTh>{i.ranking}</RankingTh>
                          <RankingTh>{i.Id}</RankingTh>
                          <RankingTh>{i.Level}</RankingTh>
                          <RankingTh>{i.DungeonFloor}</RankingTh>
                        </RankingTr>
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </RankingTbody>
          </RankingTable>
          {show ? (
            <>
              <PrevBtn
                disabled={currentPageNum === 1}
                data-prev='backward'
                onClick={() => {
                  if (currentPageNum <= 1) return;
                  setCurrentPageNum((prev) => prev - 1);
                }}
              >
                뒤로
              </PrevBtn>

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

              <PrevBtn
                data-prev='forward'
                disabled={currentPageNum === pages.length}
                onClick={() => {
                  if (currentPageNum === pages.length) return;
                  setCurrentPageNum((prev) => prev + 1);
                }}
              >
                앞으로
              </PrevBtn>
            </>
          ) : null}
        </RangkingPage>
      </RankingWrap>
    </>
  );
};

export default React.memo(Ranking);
