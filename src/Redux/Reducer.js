import { actions } from "./Action"

const intialState = []

export const reducers = (state = intialState,action)=>{
    switch (action.type){
        case actions.API:
        return action.payload
        default: return state
    }

}