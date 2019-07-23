import { SET_ALERT, REMOVE_ALERT } from '../action/types'

const initalState = []
export default (state = initalState, action) => {
    const { type, pyload } = action
    switch (type) {
        case SET_ALERT:
            return [...state, pyload]
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== pyload)
        default:
            return state
    }

}