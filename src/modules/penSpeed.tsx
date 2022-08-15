export const UPDATE_PENSPEED_REQUEST =
  'penSpeed/UPDATE_PENSPEED_REQUEST ' as const;
export const UPDATE_PENSPEED_SUCCESS =
  'penSpeed/UPDATE_PENSPEED_SUCCESS ' as const;

export const update_penspeed_request = () => ({
  type: UPDATE_PENSPEED_REQUEST,
});

export const update_penspeed_success = (ballPenSpeed: number) => ({
  type: UPDATE_PENSPEED_SUCCESS,
  ballPenSpeed,
});

type PenSpeedAction =
  | ReturnType<typeof update_penspeed_request>
  | ReturnType<typeof update_penspeed_success>;


type PenSpeedStateType = {
    penSpeed: number;
};

const PenSpeedState: PenSpeedStateType = {
  penSpeed: 5,
};

const PenSpeedRequest = (
  state: PenSpeedStateType = PenSpeedState,
  action: PenSpeedAction,
): PenSpeedStateType => {
  switch (action.type) {
    // case UPDATE_PENSPEED_REQUEST: {
    //   return { penSpeed: action };
    // }
    case UPDATE_PENSPEED_SUCCESS: {
      return { penSpeed: action.ballPenSpeed };
    }

    default:
      return state;
  }
};

export default PenSpeedRequest;
