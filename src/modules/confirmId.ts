
export const CONFIRM_ID_REQUEST = 'confirmId/CONFIRM_ID_REQUEST' as const;
export const CONFIRM_ID_SUCCESS = 'confirmId/CONFIRM_ID_SUCCESS' as const;
export const CONFIRM_ID_FAILURE = 'confirmId/CONFIRM_ID_FAILURE' as const;

export const confirm_id_request = (id :string) => ({
    type: CONFIRM_ID_REQUEST,
    id
})

export const confirm_id_success = (result :boolean | null) => ({
    type : CONFIRM_ID_SUCCESS,
    result
})

export const confirm_id_failure = (result :boolean | null) => ({
    type : CONFIRM_ID_FAILURE,
    result
})

type ConfirmIdAction =
    | ReturnType<typeof confirm_id_request>
    | ReturnType<typeof confirm_id_success>
    | ReturnType<typeof confirm_id_failure>

type ConfirmIdStateType = {
    confirmId : boolean | null
}

const confirmIdState :ConfirmIdStateType = {
    confirmId : null
}

const confirmIdRequest = (
    state : ConfirmIdStateType = confirmIdState,
    action : ConfirmIdAction
):ConfirmIdStateType => {
    switch (action.type){
        // case CONFIRM_ID_REQUEST: {
        //     return {confirmId : action.id}
        // }
        case CONFIRM_ID_SUCCESS: {
            return {confirmId : action.result}
        }
        case CONFIRM_ID_FAILURE: {
            return {confirmId : action.result}
        }
        default:
            return state;
     }
}

export default confirmIdRequest;
