//공백 체크
export const notSpaceReg = /[^0-9]/g;

//공백을 ''로 변경하여 리턴해주는 함수
export const notSpaceRegFunc = (e: any) => {
  return e.currentTarget.value.replace(notSpaceReg, '');
};

//이메일 체크
export const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
