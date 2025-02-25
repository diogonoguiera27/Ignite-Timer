import { Cycle } from "./reducers";

export enum ActionTypes {
    ADD_NEW_CYCLE='ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE='INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED='MARK_CURRENT_CYCLE_AS_FINISHED',
    
}

// criação de uma função pra cada action 

export function addNewCycleAction(newCycle:Cycle){
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
        payload:{
            newCycle,
        }
    }
}


export function markCurrentCycleAsFinishedAction(){
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
        
    }
}

export function InterruptCurrentCycleAction(){
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE
        
    }
}