export const CONFIRM_NICKNAME_REQUEST = 'confirmNickname/CONFIRM_NICKNAME_REQUEST' as const;
export const CONFIRM_NICKNAME_SUCCESS = 'confirmNickname/CONFIRM_NICKNAME_SUCCESS' as const;
export const CONFIRM_NICKNAME_FAILURE = 'confirmNickname/CONFIRM_NICKNAME_FAILURE' as const;

export const confirm_nickname_request = (nickname: string) => ({
  type: CONFIRM_NICKNAME_REQUEST,
  nickname,
});

export const confirm_nickname_success = (result: boolean | null, text: string) => ({
  type: CONFIRM_NICKNAME_SUCCESS,
  result,
  text,
});

export const confirm_nickname_failure = (result: boolean | null, text: string) => ({
  type: CONFIRM_NICKNAME_FAILURE,
  result,
  text,
});

type ConfirmNicknameAction =
  | ReturnType<typeof confirm_nickname_request>
  | ReturnType<typeof confirm_nickname_success>
  | ReturnType<typeof confirm_nickname_failure>;

type ConfirmNicknameStateType = {
  confirmNickname: boolean | null;
  text: string;
};

const confirmNicknameState: ConfirmNicknameStateType = {
  confirmNickname: null,
  text: '',
};

const confirmNicknameRequest = (
  state: ConfirmNicknameStateType = confirmNicknameState,
  action: ConfirmNicknameAction,
): ConfirmNicknameStateType => {
  switch (action.type) {
    // case CONFIRM_NICKNAME_REQUEST: {
    //     return {confirmNickname : action.nickname}
    // }
    case CONFIRM_NICKNAME_SUCCESS: {
      return { confirmNickname: action.result, text: action.text };
    }
    case CONFIRM_NICKNAME_FAILURE: {
      return { confirmNickname: action.result, text: action.text };
    }
    default:
      return state;
  }
};

export default confirmNicknameRequest;
