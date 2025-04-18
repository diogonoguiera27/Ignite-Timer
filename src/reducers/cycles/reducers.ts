import { ActionTypes } from "./action";
import {produce} from 'immer'

export interface Cycle {
    id: string;  // para conseguir representa um ciclo 
    task:string;
    minutesAmout:number
    startData:Date 
    interrupteDate?:Date
    finisheDate?:  Date
    

}

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}


export function cyclesReducer(state:CyclesState , action: any ){

    switch(action.type){
        case ActionTypes.ADD_NEW_CYCLE:
         return produce(state,draft =>{
          draft.cycles.push(action.payload.newCycle.id)
          draft.activeCycleId = action.payload.newCycle.id
         })
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:{
            const currentCycleIndex = state.cycles.findIndex(cycle =>{
              return cycle.id === state.activeCycleId
            })

            if (currentCycleIndex < 0){
              return state 
            }

            return produce(state, draft =>{
              draft.activeCycleId = null
              draft.cycles[currentCycleIndex].interrupteDate = new Date()
            })
        }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
          const currentCycleIndex = state.cycles.findIndex(cycle =>{
            return cycle.id === state.activeCycleId
          })

          if (currentCycleIndex < 0){
            return state 
          }

          return produce(state, draft =>{
            draft.activeCycleId = null
            draft.cycles[currentCycleIndex].finisheDate = new Date()
          })
        default:
            return state
    }
}