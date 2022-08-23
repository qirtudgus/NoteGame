export const PENGAME_BOXCOUNT_REQUSET = 'pengameBoxCount/PENGAME_BOXCOUNT_REQUSET' as const;
export const PENGAME_BOXCOUNT_SUCCESS = 'pengameBoxCount/PENGAME_BOXCOUNT_SUCCESS' as const;
export const PENGAME_BOXCOUNT_FAILURE = 'pengameBoxCount/PENGAME_BOXCOUNT_FAILURE' as const;

export const pengame_boxcount_request = () => ({
  type: PENGAME_BOXCOUNT_REQUSET,
});

export const pengame_boxcount_success = (boxCount: number) => ({
  type: PENGAME_BOXCOUNT_SUCCESS,
  boxCount,
});

export const pengame_boxcount_failure = () => ({
  type: PENGAME_BOXCOUNT_FAILURE,
});

type PengameBoxCountAction =
  | ReturnType<typeof pengame_boxcount_request>
  | ReturnType<typeof pengame_boxcount_success>
  | ReturnType<typeof pengame_boxcount_failure>;

type PengameBoxCountStateType = {
  boxCount: number | null;
};

const pengameBoxCountState: PengameBoxCountStateType = {
  boxCount: 0,
};

const pengameBoxCountRequest = (
  state: PengameBoxCountStateType = pengameBoxCountState,
  action: PengameBoxCountAction,
): PengameBoxCountStateType => {
  switch (action.type) {
    // case CONFIRM_ID_REQUEST: {
    //     return {confirmId : action.id}
    // }
    case PENGAME_BOXCOUNT_SUCCESS: {
      return { boxCount: action.boxCount };
    }
    case PENGAME_BOXCOUNT_FAILURE: {
      return { boxCount: 0 };
    }
    default:
      return state;
  }
};

export default pengameBoxCountRequest;
