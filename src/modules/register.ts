//액션 타입 선언
export const REGISTER = 'register/REGISTER' as const;
export const REGISTER_SUCCESS = 'register/REGISTER_SUCCESS' as const;
export const REGISTER_FAILURE = 'register/REGISTER_FAILURE' as const;

//액션 생성 함수
export const register = (id: string, password: string, nickname: string) => ({
  type: REGISTER,
  payload: { id, password, nickname },
});
export const register_success = (result: any) => ({
  type: REGISTER_SUCCESS,
  payload: result,
});

export const register_failed = (result: any) => ({
  type: REGISTER_FAILURE,
  payload: result,
});

type RegisterAction =
  | ReturnType<typeof register>
  | ReturnType<typeof register_success>
  | ReturnType<typeof register_failed>;

type IsRegisterState = {
  isRegister: number | Promise<number> | string;
};

// 초기상태를 선언합니다.
const ResgisterState: IsRegisterState = {
  isRegister: 0,
};

const regitserRequest = (state: IsRegisterState = ResgisterState, action: RegisterAction): IsRegisterState => {
  switch (action.type) {
    case REGISTER_SUCCESS: {
      return { isRegister: action.payload };
    }
    case REGISTER_FAILURE: {
      return { isRegister: action.payload };
    }
    default:
      return state;
  }
};

export default regitserRequest;
