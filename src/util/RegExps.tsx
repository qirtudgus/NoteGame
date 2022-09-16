//
export const notSpaceReg = /[^0-9]/g;

//공백을 ''로 변경하여 리턴해주는 함수
export const notSpaceRegFunc = (e: any) => {
  return e.currentTarget.value.replace(notSpaceReg, '');
};
