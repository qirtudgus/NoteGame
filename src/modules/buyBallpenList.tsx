export const BUY_BALLPEN_REQUEST =
  'buyBallpenList/BUY_BALLPEN_REQUEST ' as const;
export const BUY_BALLPEN_SUCCESS =
  'buyBallpenList/BUY_BALLPEN_SUCCESS ' as const;

export const buy_ballpen_request = (ballpenName: string) => ({
  type: BUY_BALLPEN_REQUEST,
  ballpenName,
});

export const buy_ballpen_success = (buyBallpenList: any) => ({
  type: BUY_BALLPEN_SUCCESS,
  buyBallpenList,
});

type BuyBallpenListAction =
  | ReturnType<typeof buy_ballpen_request>
  | ReturnType<typeof buy_ballpen_success>;

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
    case BUY_BALLPEN_SUCCESS: {
      return { buyBallpenList: action.buyBallpenList };
    }

    default:
      return state;
  }
};

export default buyBallpenListRequest;
