export const ISLOADING_REQUEST = 'isLoading/ISLOADING_REQUEST' as const;
export const ISLOADING_SUCCESS = 'isLoading/ISLOADING_SUCCESS' as const;
export const ISLOADING_FAILURE = 'isLoading/ISLOADING_FAILURE' as const;

export const isloading_request = () => ({
  type: ISLOADING_REQUEST,
});
export const isloading_success = (text: string) => ({
  type: ISLOADING_SUCCESS,
  text,
});
export const isloading_failure = (text: string) => ({
  type: ISLOADING_FAILURE,
  text,
});

type IsLoadingAction =
  | ReturnType<typeof isloading_request>
  | ReturnType<typeof isloading_success>
  | ReturnType<typeof isloading_failure>;

type status = 0 | 1 | 2 | 3;

type IsLoadingStateType = {
  isLoading: boolean | null;
  text: string;
  code: status;
};

const IsLoadingState: IsLoadingStateType = {
  isLoading: null,
  text: '',
  code: 0,
};

const isLoadingRequest = (state: IsLoadingStateType = IsLoadingState, action: IsLoadingAction): IsLoadingStateType => {
  switch (action.type) {
    case ISLOADING_REQUEST: {
      return { isLoading: true, text: '', code: 1 };
    }
    case ISLOADING_SUCCESS: {
      return { isLoading: false, text: action.text, code: 2 };
    }
    case ISLOADING_FAILURE: {
      return { isLoading: null, text: action.text, code: 3 };
    }
    default:
      return state;
  }
};

export default isLoadingRequest;
