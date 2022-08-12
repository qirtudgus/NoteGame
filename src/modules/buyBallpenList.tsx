export const UPDATE_BALLPEN_REQUEST =
  'buyBallpenList/UPDATE_BALLPEN_REQUEST ' as const;
export const UPDATE_BALLPEN_SUCCESS =
  'buyBallpenList/UPDATE_BALLPEN_SUCCESS ' as const;

export const REAL_BUY_BALLPEN_REQUEST =
  'buyBallpenList/REAL_BUY_BALLPEN_REQUEST ' as const;

export const REAL_BUY_BALLPEN_SUCCESS =
  'buyBallpenList/REAL_BUY_BALLPEN_SUCCESS ' as const;

export const real_buy_ballpen_request = (
  ballpenName: string,
  gold: string,
) => ({
  type: REAL_BUY_BALLPEN_REQUEST,
  ballpenName,
  gold,
});

export const real_buy_ballpen_success = (buyBallpenList: any) => ({
  type: REAL_BUY_BALLPEN_SUCCESS,
  buyBallpenList,
});

export const update_ballpen_request = () => ({
  type: UPDATE_BALLPEN_REQUEST,
});

export const update_ballpen_success = (buyBallpenList: any) => ({
  type: UPDATE_BALLPEN_SUCCESS,
  buyBallpenList,
});

type BuyBallpenListAction =
  | ReturnType<typeof update_ballpen_request>
  | ReturnType<typeof update_ballpen_success>
  | ReturnType<typeof real_buy_ballpen_request>
  | ReturnType<typeof real_buy_ballpen_success>;

type BuyBallpenListStateType = {
  buyBallpenList: any;
};

const BuyBallpenListState: BuyBallpenListStateType = {
  buyBallpenList: {},
};

const buyBallpenListRequest = (
  state: BuyBallpenListStateType = BuyBallpenListState,
  action: BuyBallpenListAction,
): BuyBallpenListStateType => {
  switch (action.type) {
    case UPDATE_BALLPEN_SUCCESS: {
      return { buyBallpenList: action.buyBallpenList };
    }
    case REAL_BUY_BALLPEN_SUCCESS: {
      return { buyBallpenList: action };
    }

    default:
      return state;
  }
};

export default buyBallpenListRequest;
