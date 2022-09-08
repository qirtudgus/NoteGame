export const CONFIRM_ID_REQUEST = 'confirmId/CONFIRM_ID_REQUEST' as const;
export const CONFIRM_ID_SUCCESS = 'confirmId/CONFIRM_ID_SUCCESS' as const;
export const CONFIRM_ID_FAILURE = 'confirmId/CONFIRM_ID_FAILURE' as const;

export const confirm_id_request = (id: string) => ({
  type: CONFIRM_ID_REQUEST,
  id,
});

export const confirm_id_success = (result: boolean | null, text: string) => ({
  type: CONFIRM_ID_SUCCESS,
  result,
  text,
});

export const confirm_id_failure = (result: boolean | null, text: string) => ({
  type: CONFIRM_ID_FAILURE,
  result,
  text,
});

type ConfirmIdAction =
  | ReturnType<typeof confirm_id_request>
  | ReturnType<typeof confirm_id_success>
  | ReturnType<typeof confirm_id_failure>;

type ConfirmIdStateType = {
  confirmId: boolean | null;
  text: string;
};

const confirmIdState: ConfirmIdStateType = {
  confirmId: null,
  text: '',
};

const confirmIdRequest = (state: ConfirmIdStateType = confirmIdState, action: ConfirmIdAction): ConfirmIdStateType => {
  switch (action.type) {
    // case CONFIRM_ID_REQUEST: {
    //     return {confirmId : action.id}
    // }
    case CONFIRM_ID_SUCCESS: {
      return { confirmId: action.result, text: action.text };
    }
    case CONFIRM_ID_FAILURE: {
      return { confirmId: action.result, text: action.text };
    }
    default:
      return state;
  }
};

export default confirmIdRequest;
