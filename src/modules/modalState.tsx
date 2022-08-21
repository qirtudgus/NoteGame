export const MODAL_REQUEST = 'modalState/MODAL_REQUEST' as const;
export const MODAL_SUCCESS = 'modalState/MODAL_SUCCESS' as const;
export const MODAL_FAILURE = 'modalState/MODAL_FAILURE' as const;

export const modal_request = () => ({
  type: MODAL_REQUEST,
});

export const modal_success = () => ({
  type: MODAL_SUCCESS,
});

export const modal_failure = () => ({
  type: MODAL_FAILURE,
});

type ModalAction =
  | ReturnType<typeof modal_request>
  | ReturnType<typeof modal_success>
  | ReturnType<typeof modal_failure>;

type ModalStateType = {
  isModal: boolean;
};

const confirmIdState: ModalStateType = {
  isModal: false,
};

const modalRequest = (
  state: ModalStateType = confirmIdState,
  action: ModalAction,
): ModalStateType => {
  switch (action.type) {
    // case CONFIRM_ID_REQUEST: {
    //     return {confirmId : action.id}
    // }
    case MODAL_SUCCESS: {
      return { isModal: true };
    }
    case MODAL_FAILURE: {
      return { isModal: false };
    }
    default:
      return state;
  }
};

export default modalRequest;
