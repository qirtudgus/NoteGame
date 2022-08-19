import React, { useCallback, useEffect, useState } from 'react';
import BtnMenu from '../components/BtnMenu';
import customAxios from '../util/axios';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import 왼쪽화살표 from '../img/왼쪽화살표.svg';
import 오른쪽화살표 from '../img/오른쪽화살표.svg';

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
  width: 100%;
  height: 50px;
  font-size: 2rem;
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
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
  height: 40px;
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
  border-radius: 10px;
  ${(props) =>
    props.active &&
    css`
      background: #444;
      color: #fff;
    `}
  &:hover {
    outline: 2px solid #444;
    outline-offset: -3px;
  }
`;

const BtnWrap = styled.div`
  display: flex;
`;

const SearchBar = styled.div`
  display: flex;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #888;
  margin: 10px 0 10px 0;
`;

const Ranking = () => {
  const userId = useSelector((state: RootState) => state.login.id);
  //어떤 순위 보여주는지
  const [disabled, setDisabled] = useState(false);
  const [Id, setId] = useState('');
  //어떤 순위 보여주는지
  const [show, setShow] = useState({
    page: true,
    btn: true,
    userUndifined: false,
  });
  //내 랭킹
  const [myList, setMyList] = useState<[]>([]);
  //페이지 사이즈
  const PAGE_SIZE = 10;
  //총 페이지
  let total: number = 0;
  //리스트에 따른 페이지 갯수
  const [pages, setPages] = useState<number[]>([]);
  //전체 랭킹을 보여줄 10개의 리스트
  const [list, setList] = useState<[]>([]);
  //현재 보여줄 페이지번호
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  //현재 보여줄 페이지리스트들
  const [pageList, setPageList] = useState<number[]>([]);

  const call = async (currentPageNum: number): Promise<void> => {
    let payloadObj = await customAxios('post', '/ranking/allranking', {
      currentPageNum,
    }).then((res) => {
      // 10개의 게시글을 불러온다.
      return res.data.payload;
    });
    console.log(payloadObj.data);
    setList(() => payloadObj.data);
    //토탈페이지수를 변수에 할당해준다.
    total = payloadObj.listNum;
    //페이지 정수를 받아와 배열 생성 후 setState해준다.
    //https://hjcode.tistory.com/73
    let pagesNum = Array.from({ length: payloadObj.listNum }, (v, i) => i);
    setPages([...pagesNum]);
    foo(currentPageNum);
  };

  const callmyranking = async () => {
    let result = await customAxios('post', '/ranking/myranking/', {}).then(
      (res) => {
        return res.data;
      },
    );
    console.log(result.myRanking);
    let a: any = [];
    a.push(result.myRanking);
    setMyList(() => a);
  };

  //첫 데이터를 불러온다.
  useEffect(() => {
    call(currentPageNum);
    callmyranking();
  }, [currentPageNum]);

  let arr: any = [];
  const foo = (currentPage: number) => {
    //현재 페이지와 페이즈사이즈를 나눠 1이 남았을 때 이 후 번호의 배열을 생성
    if (currentPage % PAGE_SIZE === 1) {
      let idx = 1; // 이 수를 current에 더 해준다.
      arr = [currentPage];

      /*
      아래 두 조건이 거짓이 될 때까지 반복한다.
      1. 현재 페이지와 idx를 더한 값이 총 페이지보다 작거나 같을 때
      2. 펼칠 페이지 배열의 길이가 페이지사이즈보다 작을 때

      1번 조건은 배열에 들어갈 페이지값을 구하는것이다.
      총페이지 7 기준으로 현재 페이지에 1++을 더 했을 때 작거나같으므로 배열에 4,5,6,7이가 추가된다.
      8(앞의 피연산자)은 7(총페이지)보다 크므로 조건이 거짓이 되고, [ 4,5,6,7 ] 로 1번 조건이 종료된다.

      2번 조건은 1번의 부족한 논리를 보충하여, 펼칠 페이지 사이즈만큼의 배열을 만들기위함이다.
      우리가 원하는 페이지사이즈는 3인데 1번조건은 4개까지 생성했다.
      배열의 길이가 페이지 사이즈보다 작을 때까지만 true를 반환하고
      페이지 사이즈보다 큰 [4,5,6,7]은 거짓으로 연산되어
      [4,5,6,7]이 아닌 [4,5,6]을 반환하게 된다.
      */
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

  const handleSubmit = async (e: any) => {
    setDisabled(true);
    setShow({ ...show, page: true, btn: false });
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 500));
    console.log(Id);
    let result = await customAxios('GET', `/ranking/searchid/${Id}`, {}).then(
      (res) => {
        return res.data;
      },
    );
    setDisabled(false);

    //코드가 404일경우 아이디가 없다는 것
    if (result.code === 404) {
      setShow({ page: false, btn: false, userUndifined: true });
      return;
    }
    setShow({ page: false, btn: false, userUndifined: false });
    setList(() => result.searchIdArr);
  };

  const handleChange = ({ target: { value } }: any) => setId(value);

  return (
    <>
      <BtnMenu BackHistory></BtnMenu>
      <RankingWrap>
        <RankingTabWrap>
          <RankingTab>전체 순위</RankingTab>
        </RankingTabWrap>
        <RangkingPage>
          <RankingTable>
            <RankingTbody>
              <RankingTr bar>
                <RankingTh>순위</RankingTh>
                <RankingTh>닉네임</RankingTh>
                <RankingTh>레벨</RankingTh>
                <RankingTh>최고층</RankingTh>
              </RankingTr>
              <RankingTr bar>
                {myList!.map((i: any, index: any) => (
                  <React.Fragment key={index}>
                    <RankingTh>{i.ranking}</RankingTh>
                    <RankingTh>{i.Id}</RankingTh>
                    <RankingTh>{i.Level}</RankingTh>
                    <RankingTh>{i.DungeonFloor}</RankingTh>
                  </React.Fragment>
                ))}
              </RankingTr>
              <Line></Line>
              {show.userUndifined ? (
                <div>
                  '검색 결과가 없어요! 아이디를 다시 확인해보는게 어때요?'
                </div>
              ) : (
                <>
                  {list!.map((i: any, index: any) => (
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
          {show.btn && (
            <BtnWrap>
              <PageBtn
                disabled={currentPageNum === 1}
                data-prev='backward'
                onClick={() => {
                  setCurrentPageNum((prev) => prev - 1);
                }}
              >
                <img src={왼쪽화살표} alt='뒤로'></img>
              </PageBtn>

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

              <PageBtn
                data-prev='forward'
                disabled={currentPageNum === pages.length}
                onClick={() => {
                  setCurrentPageNum((prev) => prev + 1);
                }}
              >
                <img src={오른쪽화살표} alt='앞으로'></img>
              </PageBtn>
            </BtnWrap>
          )}
          <SearchBar>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                id='searchId'
                value={Id}
                onChange={handleChange}
                placeholder='아이디 검색'
              ></input>
              <input disabled={disabled} type='submit' value='검색'></input>
            </form>
            <button
              disabled={show.btn}
              onClick={() => {
                call(currentPageNum);
                setShow({ userUndifined: false, page: true, btn: true });
              }}
            >
              취소
            </button>
          </SearchBar>
        </RangkingPage>
      </RankingWrap>
    </>
  );
};

export default React.memo(Ranking);
