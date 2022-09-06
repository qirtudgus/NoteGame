export const BUY_PAPER_REQUEST = 'buyPaperList/BUY_PAPER_REQUEST' as const;
export const BUY_PAPER_SUCCESS = 'buyPaperList/BUY_PAPER_SUCCESS' as const;
export const UPDATE_PAPER_REQUEST = 'buyPaperList/UPDATE_PAPER_REQUEST' as const;
export const UPDATE_PAPER_SUCCESS = 'buyPaperList/UPDATE_PAPER_SUCCESS' as const;

export const buy_paper_request = (paperName: string, Gold: string) => ({
  type: BUY_PAPER_REQUEST,
  paperName,
  Gold,
});
export const buy_paper_success = (buyPaperList: [string]) => ({
  type: BUY_PAPER_SUCCESS,
  buyPaperList,
});

export const update_paper_request = () => ({
  type: UPDATE_PAPER_REQUEST,
});
export const update_paper_success = (buyPaperList: [string]) => ({
  type: UPDATE_PAPER_SUCCESS,
  buyPaperList,
});

type BuyPaperListAction =
  | ReturnType<typeof buy_paper_request>
  | ReturnType<typeof buy_paper_success>
  | ReturnType<typeof update_paper_request>
  | ReturnType<typeof update_paper_success>;

type BuyPaperListStateType = {
  buyPaperList: string[];
};

const BuyPaperListState: BuyPaperListStateType = {
  buyPaperList: [],
};
const buyPaperListRequest = (
  state: BuyPaperListStateType = BuyPaperListState,
  action: BuyPaperListAction,
): BuyPaperListStateType => {
  switch (action.type) {
    case UPDATE_PAPER_SUCCESS: {
      return { buyPaperList: action.buyPaperList };
    }
    case BUY_PAPER_SUCCESS: {
      return { buyPaperList: action.buyPaperList };
    }

    default:
      return state;
  }
};

export default buyPaperListRequest;
