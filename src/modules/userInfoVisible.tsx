export const USERINFO_VISIBLE_REQUEST = 'userInfoVisible/USERINFO_VISIBLE_REQUEST' as const;
export const USERINFO_VISIBLE_ON = 'visibleState/USERINFO_VISIBLE_ON' as const;
export const USERINFO_VISIBLE_OFF = 'visibleState/USERINFO_VISIBLE_OFF' as const;

export const userInfo_visible_request = () => ({
  type: USERINFO_VISIBLE_REQUEST,
});

export const userInfo_visible_on = () => ({
  type: USERINFO_VISIBLE_ON,
});

export const userInfo_visible_off = () => ({
  type: USERINFO_VISIBLE_OFF,
});

type userInfo_visibleAction =
  | ReturnType<typeof userInfo_visible_request>
  | ReturnType<typeof userInfo_visible_on>
  | ReturnType<typeof userInfo_visible_off>;

type userInfo_visibleStateType = {
  isVisible: boolean;
};

const userInfo_visibleState: userInfo_visibleStateType = {
  isVisible: false,
};

const userInfo_visibleRequest = (
  state: userInfo_visibleStateType = userInfo_visibleState,
  action: userInfo_visibleAction,
): userInfo_visibleStateType => {
  switch (action.type) {
    case USERINFO_VISIBLE_ON: {
      return { isVisible: true };
    }
    case USERINFO_VISIBLE_OFF: {
      return { isVisible: false };
    }
    default:
      return state;
  }
};

export default userInfo_visibleRequest;
