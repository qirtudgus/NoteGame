import React, { useCallback, useEffect, useState } from 'react';
import BtnMenu from '../components/BtnMenu';
import customAxios from '../util/axios';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';

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
  background: #555;
  display: flex;
  justify-content: center;
  align-items: center;
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

  //관리할 페이지 사이즈 // 현재 12
  const [totalPages, setTotalPages] = useState<number>();

  //리스트에 따른 페이지 갯수 // 0 부터 11 까지의 배열
  const [pages, setPages] = useState<number[]>([]);
  //전체 랭킹 보여줄 10개의 리스트
  const [list, setList] = useState<[]>([]);
  //현재 보여줄 페이지번호
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

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

  const actionCheck = (el: any, currentNode: any) => {
    console.log(currentPageNum);
    //뒤로 버튼을 눌렀을 시
    if (el.dataset.prev === 'backward') {
      //1페이지일 경우 함수 종료
      if (parseInt(currentNode?.dataset.pagenum as string) === 1) return;
      setCurrentPageNum((prev) => prev - 1);
      let a: number = parseInt(currentNode?.dataset.pagenum as string);
      call(a - 1);
      return;
    }
    //앞으로 버튼을 눌렀을 시....
    if (el.dataset.prev === 'forward') {
      //마지막 페이지일 경우 함수 종료
      if (parseInt(currentNode?.dataset.pagenum as string) === pages.length)
        return;
      let a: number = parseInt(currentNode?.dataset.pagenum as string);
      if (a > pages.length) return;
      setCurrentPageNum((prev) => prev + 1);
      call(a + 1);
      return;
    }
    // console.log(el)
    let requestNumber = el.dataset.pagenum as number;
    call(requestNumber);
  };

  //페이지 버튼 클릭 시 데이터 요청
  const requestCall = (e: any) => {
    console.log(pages);
    let el = e.currentTarget;
    let currentNode = document.getElementById('active');

    actionCheck(el, currentNode);
  };

  const callmyranking = async (userId: string | number | undefined) => {
    if (userId === undefined) return;
    let result = await customAxios('post', '/ranking/myranking/', {
      userId,
    }).then((res) => {
      console.log(res.data);
      return res.data.b;
    });
    setMyList(() => result);
  };

  //첫 데이터를 불러온다.
  useEffect(() => {
    call(currentPageNum);
  }, []);

  return (
    <>
      <BtnMenu BackHistory></BtnMenu>
      <button
        onClick={() => {
          callmyranking(userId);
          console.log(list);
          console.log(pages);
          console.log(totalPages);
        }}
      >
        나의 랭킹확인
      </button>
      <button
        onClick={() => {
          call(currentPageNum);
          console.log(list);
          console.log(pages);
          console.log(totalPages);
        }}
      >
        랭킹확인
      </button>
      <RankingWrap>
        <RankingTabWrap>
          <RankingTab
            onClick={() => {
              setShow(() => true);
            }}
          >
            전체 순위
          </RankingTab>
          <RankingTab
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
              <>
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
              </>
            </RankingTbody>
          </RankingTable>
          {show ? (
            <>
              <PrevBtn
                data-prev='backward'
                onClick={(e) => {
                  requestCall(e);
                }}
              >
                뒤로
              </PrevBtn>

              {pages!.map((i: any, index: any) => (
                <PageBtn
                  data-pagenum={i + 1}
                  key={i}
                  active={currentPageNum === index + 1}
                  id={currentPageNum === index + 1 ? 'active' : ''}
                  onClick={(e) => {
                    requestCall(e);
                    setCurrentPageNum(index + 1);
                  }}
                >
                  {i + 1}
                </PageBtn>
              ))}

              <PrevBtn
                data-prev='forward'
                onClick={(e) => {
                  requestCall(e);
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
