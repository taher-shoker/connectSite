import uuid from 'uuid'
import {SET_ALERT, REMOVE_ALERT} from './types'

export const setAlert= (msg,alertType)=> dispatch =>{
    const id = uuid.v4()
    dispatch({
        type:SET_ALERT,
        pyload:{msg,alertType,id}
    })
    setTimeout(()=>dispatch({type:REMOVE_ALERT,pyload:id}),4000)

}