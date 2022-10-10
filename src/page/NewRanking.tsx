import React, { useEffect, useState } from 'react';
import BtnMenu from '../components/BtnMenu';
import customAxios from '../util/axios';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import 왼쪽화살표 from '../img/왼쪽화살표.svg';
import 오른쪽화살표 from '../img/오른쪽화살표.svg';
import 돋보기 from '../img/돋보기.svg';
import 금메달 from '../img/금메달.png';
import 은메달 from '../img/은메달.png';
import 동메달 from '../img/동메달.png';

const RankingWrap = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const RankingTabWrap = styled.div`
  display: flex;
  width: 102%;
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
  & > span {
    margin-left: 247px;
  }
`;
const RangkingPage = styled.div`
  width: 100%;
  height: 100%;
  min-height: 550px;
`;

const SearchBar = styled.div`
  width: 47%;
  display: flex;
  align-items: center;
`;

const SearchSpan = styled.span`
  display: flex;
  border-radius: 5px;

  background: #fff;
  border: 1px solid#888;
  justify-content: center;
  align-items: center;
  & img {
    position: relative;
    top: 2px;
    height: 30px;
  }
`;
const SearchInput = styled.input`
  height: 25px;
  width: 165px;
  margin-left: 5px;
  font-size: 1.2rem;
  border: none;
`;

const SearchBtn = styled.button`
  height: 100%;
  font-size: 1.2rem;
  background: none;
  padding: 0 5px 0 0;
`;

const SearchBtnWrap = styled.span`
  display: flex;
  align-items: center;
`;

const MyRanking = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  margin-top: 30px;
  background-color: #eee;
  border-radius: 5px;
  background: #ffbc26;
`;

interface ranking {
  rankingNumber?: number;
}

const Ranking = styled.div<ranking>`
  width: 100%;
  height: 40px;
  display: flex;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d3d3d3;
  &:nth-child(2n) {
    background: #e7e7e7;
  }
  ${(props) =>
    props.rankingNumber === 1 &&
    css`
      &::before {
        content: '';
        width: 30px;
        height: 30px;
        background-image: url(${금메달});
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        left: 120px;
      }
    `}

  ${(props) =>
    props.rankingNumber === 2 &&
    css`
      &::before {
        content: '';
        width: 30px;
        height: 30px;
        background-image: url(${은메달});
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        left: 120px;
      }
    `}
    ${(props) =>
    props.rankingNumber === 3 &&
    css`
      &::before {
        content: '';
        width: 30px;
        height: 30px;
        background-image: url(${동메달});
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        left: 120px;
      }
    `}
`;

const HeadCell = styled.p`
  font-size: 1.5rem;
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cell = styled.p`
  font-size: 1.2rem;
  width: 25%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MyCell = styled.p`
  font-size: 1.5rem;
  width: 25%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    font-size: 1.2rem;
    content: '내 순위';
    position: absolute;
    left: 120px;
  }
`;
const UndefinedPage = styled.div`
  width: 100%;
  height: 65%;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const UndefinedBtn = styled.button`
  width: 230px;
  margin-top: 20px;
  height: 50px;
  background: #555;
  color: #fff;
  border-radius: 10px;
`;

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
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const PageMinWidth = styled.div`
  display: flex;
  justify-content: center;
  min-width: 300px;
`;
const NewRangking = () => {
  const userId = useSelector((state: RootState) => state.login.id);
  //어떤 순위 보여주는지
  const [disabled, setDisabled] = useState(false);
  const [Id, setId] = useState('');
  //검색 시 페이지와 버튼을 가리기 위함
  const [show, setShow] = useState({
    page: true,
    btn: true,
    userUndifined: false,
  });
  //내 랭킹
  const [myList, setMyList] = useState<[]>([]);
  //보여줄 페이지 사이즈
  const PAGE_SIZE = 10;
  //총 페이지 수
  let total: number = 0;
  //리스트에 따른 페이지 갯수
  const [pages, setPages] = useState<number[]>([]);
  //전체 랭킹에 보여줄 10개의 리스트
  const [list, setList] = useState<[]>([]);
  //현재 보여주고있는 페이지번호
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  //현재 보여주고있는 페이지버튼 리스트
  const [pageList, setPageList] = useState<number[]>([]);

  const call = async (currentPageNum: number): Promise<void> => {
    let payloadObj = await customAxios('post', '/ranking/allranking', {
      currentPageNum,
    }).then((res) => {
      // 10개의 게시글을 불러온다.
      return res.data.payload;
    });
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
    let result = await customAxios('post', '/ranking/myranking/', {}).then((res) => {
      return res.data;
    });
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
    let result = await customAxios('GET', `/ranking/searchid/${Id}`, {}).then((res) => {
      return res.data;
    });
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
          <RankingTab>
            <span>전체 순위</span>
          </RankingTab>
          <SearchBar>
            <SearchSpan>
              <SearchInput
                placeholder='닉네임 검색'
                maxLength={10}
                type='text'
                id='searchId'
                value={Id}
                onChange={handleChange}
              ></SearchInput>
              <SearchBtnWrap>
                <SearchBtn
                  disabled={disabled}
                  onClick={handleSubmit}
                >
                  <img
                    src={돋보기}
                    alt='검색'
                  />
                </SearchBtn>
                <SearchBtn
                  disabled={show.btn}
                  onClick={() => {
                    call(currentPageNum);
                    setShow({ userUndifined: false, page: true, btn: true });
                  }}
                >
                  취소
                </SearchBtn>
              </SearchBtnWrap>
            </SearchSpan>
          </SearchBar>
        </RankingTabWrap>

        <RangkingPage>
          <Ranking>
            <HeadCell>순위</HeadCell>
            <HeadCell>닉네임</HeadCell>
            <HeadCell>레벨</HeadCell>
            <HeadCell>최고 층</HeadCell>
          </Ranking>

          {show.userUndifined ? (
            <UndefinedPage>
              <p>존재하지않는 닉네임이에요...</p>
              <UndefinedBtn
                onClick={() => {
                  call(currentPageNum);
                  setShow({ userUndifined: false, page: true, btn: true });
                }}
              >
                돌아가기
              </UndefinedBtn>
            </UndefinedPage>
          ) : (
            <>
              {list!.map((i: any, index: any) => (
                <React.Fragment key={index}>
                  {i.Id === userId ? (
                    <Ranking>
                      <Cell>{i.ranking}</Cell>
                      <Cell>{i.Nickname}</Cell>
                      <Cell>{i.Level}</Cell>
                      <Cell>{i.MaxDungeonFloor}</Cell>
                    </Ranking>
                  ) : (
                    <Ranking rankingNumber={i.ranking}>
                      <Cell>{i.ranking}</Cell>
                      <Cell>{i.Nickname}</Cell>
                      <Cell>{i.Level}</Cell>
                      <Cell>{i.MaxDungeonFloor}</Cell>
                    </Ranking>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
          <MyRanking>
            {myList!.map((i: any, index: any) => (
              <React.Fragment key={index}>
                <MyCell>{i.ranking}</MyCell>
                <Cell>{i.Nickname}</Cell>
                <Cell>{i.Level}</Cell>
                <Cell>{i.MaxDungeonFloor}</Cell>
              </React.Fragment>
            ))}
          </MyRanking>
        </RangkingPage>

        {show.btn && (
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
        )}
      </RankingWrap>
    </>
  );
};

export default React.memo(NewRangking);
