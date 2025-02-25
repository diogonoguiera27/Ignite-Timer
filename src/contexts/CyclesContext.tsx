import { createContext, ReactNode, useState,useReducer, useEffect } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducers";
import {  addNewCycleAction, InterruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/action";
import { differenceInSeconds } from "date-fns";


interface CreateCycleData {
    task: string 
    minutesAmount:number 
}



interface CyclesContextType {
    cycles: Cycle[]
    activeCycle:Cycle | undefined
    activeCycleId: string | null
    amountSecondPassed:number 
    markCurrentCycleAsFinished:() => void
    setSecondsPassed:(seconds:number) => void
    CreateNewCycle:(data: CreateCycleData) => void
    InterruptCurrentCycle:() => void
}


export const CyclesContext  =  createContext({} as CyclesContextType )

interface CyclesContextProviderProps{
    children: ReactNode
}



export function CycleContextProvider ({children}:CyclesContextProviderProps){
    const[cyclesState,dispatch]= useReducer(cyclesReducer, {
        cycles:[],
        activeCycleId: null,
    },(initialState)=>{
        const  storedStateAsJSON =   localStorage.getItem(
            '@ignite-Timer>cycles-state-1.0.0'
        )

        if (storedStateAsJSON){
            return JSON.parse(storedStateAsJSON)
        }

        return initialState
    }) 

      const{cycles,activeCycleId} = cyclesState

      const activeCycle = cycles.find((cycle)=> cycle.id === activeCycleId)

      const [amountSecondPassed, setAmountSecondsPassed ] = useState(()=>{

       if (activeCycle){
        return differenceInSeconds(new Date(), new Date(activeCycle.startData))
       }
        return  0 
      })

      useEffect(()=>{

        const stateJson = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-Timer>cycles-state-1.0.0',stateJson)
      },[cyclesState])

      
      

      function  markCurrentCycleAsFinished(){

        dispatch(markCurrentCycleAsFinishedAction())

    }

    function setSecondsPassed(seconds:number){
        setAmountSecondsPassed(seconds)
    }


    function CreateNewCycle(data:CreateCycleData){

        const id = String(new Date().getTime());
        // agora aqui podemos colocar o nosso novo ciclo cqui dentro 

        const newCycle:Cycle = {
            id,
            task:data.task,
            minutesAmout: data.minutesAmount,
            startData: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))
        
        

        setAmountSecondsPassed(0)

       
    }

    
    function InterruptCurrentCycle (){

        dispatch(InterruptCurrentCycleAction())
        
        
    }
    
        return(
            <CyclesContext.Provider
           value= {{
              cycles,
              activeCycle , 
              activeCycleId, 
              markCurrentCycleAsFinished,
              amountSecondPassed,
              setSecondsPassed,
              CreateNewCycle,
              InterruptCurrentCycle
           }}
          >
            {children}
          </CyclesContext.Provider>
        )
}