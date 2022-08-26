export const VISIBLE_REQUEST = 'visibleState/MODAL_REQUEST' as const;
export const VISIBLE_ON = 'visibleState/MODAL_ON' as const;
export const VISIBLE_OFF = 'visibleState/MODAL_OFF' as const;

export const visible_request = () => ({
  type: VISIBLE_REQUEST,
});

export const visible_on = () => ({
  type: VISIBLE_ON,
});

export const visible_off = () => ({
  type: VISIBLE_OFF,
});

type visibleAction =
  | ReturnType<typeof visible_request>
  | ReturnType<typeof visible_on>
  | ReturnType<typeof visible_off>;

type visibleStateType = {
  isVisible: boolean;
};

const visibleState: visibleStateType = {
  isVisible: false,
};

const visibleRequest = (state: visibleStateType = visibleState, action: visibleAction): visibleStateType => {
  switch (action.type) {
    case VISIBLE_ON: {
      return { isVisible: true };
    }
    case VISIBLE_OFF: {
      return { isVisible: false };
    }
    default:
      return state;
  }
};

export default visibleRequest;
