// //https://velog.io/@kler/TIL4-%EB%A1%9C%EC%BB%AC%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%84%B8%EC%85%98%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%BF%A0%ED%82%A4-%EC%A0%95%EB%A6%AC
// 0. 로그인 상태객체 생성 {loginSuccess:false, payload : {jwt:21332sdsa,userId:1234}}

// 1.클라이언트에서 id와 pw를 작성 후 로그인

// 1. id pw를 payload로 액션을 디스패치

// 1. 리덕스사가에서 서버에게 id와 pw를 보내는 api통신 함수 호출

// 2.서버에서는 id로 db를 조회해서 db에 들어있는 salt값과 hashPassword를 획득

// 3.서버에서 pw를 db의 salt값으로 다시 hash한 뒤 기존 hashPassword와 비교

// 3번 비교 후 동일 시 (로그인 성공 시 )

// 4.id값을 payload에 담은 jwt토큰 생성

// 5.생성한 토큰을 클라이언트에게 응답

// 6.리덕스사가에서 토큰을 payload로 상태값에 전송하고

// 7.클라이언트에서 상태값을 조회하여 토큰을 로컬스토리지에 저장

// 8.api통신 시 토큰을 담아보내어 해당 유저의 db 조회 및 데이터 획득

export const a = 1;