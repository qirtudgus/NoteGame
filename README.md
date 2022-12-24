# 던전노트
추억의 RPG, 공책 게임을 웹으로 구현한 웹게임입니다.

목차

1. [Stacks](#-stacks)
2. [진행 동기](#-진행-동기)
3. [프로젝트를 통해 경험한 것!](#-프로젝트를-통해-경험한-것)

## 🛠 Stacks
### Frontend
React / TypeScript / Styled-Components / Redux / Redux-Saga
### Backend
Node / MySQL
### Deploy
AWS-EC2-Linux /  Nginx / Git Actions


## 🚗 진행 동기
초등학교 시절 공책에 캐릭터, 맵, 몬스터 등 수많은 오브젝트와 UI를 직접 그리며
진행하는 공책 게임이란 것이 떠올랐습니다. 주위에 기억하는 사람은 없었지만, 포털사이트에 공책 게임을 검색하면 흔적이 있는걸 확인하고는
"내 추억은 가짜가 아니었어!"라는 기쁜 마음에 이것을 웹으로 구현해 보자는 결심이 들었습니다.

## 🏆 프로젝트를 통해 경험한 것!
- #### 시작부터 배포까지 직접 개발하였습니다.
이 과정에서 React뿐만이 아니라 node, aws, mysql 등 더 다양한 기술을 경험해볼 수 있었다.

- #### CI/CD 구축
GitHub Actions를 통해 master 브랜치가 merge 또는 push 될 때마다 ssh를 통해 ec2에 접속하여
빌드 및 배포 진행을 자동화 하였다. 

- #### 사용자 정보를 Redux를 통해 관리
게임 특성상 사용자의 체력이나 공격력, 또는 장착중인 무기와 방어구 등 프론트에서 접근해야할 데이터가 여러 개 있다.
이 데이터들은 다양한 컴포넌트에서 쓰이기때문에 쉽게 접근할 수 있도록, 전역에서 관리하는것이 옳다고 생각하여 Redux를 통해 관리했다.

- #### LocalStorage를 이용해 일회용 팝업창 구현
- #### anime.js, styeld-components를 통해 전투 애니메이션 구현
- #### pagination을 이용하여 도감의 페이지를 구현
- #### react-intersection-observer을 통해 상점의 무한 스크롤을 구현
- #### LocalStorage와 jwt를 이용해 로그인 기능 구현
- #### pm2를 이용해 서버 프로세스 관리
