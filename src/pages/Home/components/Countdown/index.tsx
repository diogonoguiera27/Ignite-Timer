import { useContext, useEffect} from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";



export function Countdown() {
   const {
    activeCycle , 
    activeCycleId, 
    markCurrentCycleAsFinished,
    amountSecondPassed,
    setSecondsPassed,
  } =  useContext(CyclesContext)
   

   const totalSeconds = activeCycle ? activeCycle?.minutesAmout * 60 : 0

   useEffect(()=>{ // criasção de uma intervalo nmo usefect 
   
           let interval: number 
   
           if (activeCycle){
               interval = setInterval(()=>{
                   const secondDifference = differenceInSeconds(
                       new Date(),
                       new Date(activeCycle.startData),
                   ) 
   
                   if (secondDifference >= totalSeconds){
                     markCurrentCycleAsFinished()
                     setSecondsPassed(totalSeconds)
                     clearInterval(interval)
                   }else{
                    setSecondsPassed(secondDifference)
                   }
               },1000)
           }
   
               
   
           // finção otma para teletar os intervalor que nao preciso   mais 
           return () => { // serve para  quando eu executar o usefect d novo , eu quero fazer algo ou resetar  do usefect anterior  
               clearInterval(interval)
           }
       },[
        activeCycle,
        totalSeconds,
        activeCycleId,
        markCurrentCycleAsFinished,
        setSecondsPassed
    ])

   const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed: 0 

    const minutesAmount =   Math.floor(currentSeconds / 60 )
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2,'0')
    const seconds = String(secondsAmount).padStart(2,'0')

    useEffect (()=>{
        if (activeCycle){
            document.title =  `${minutes}:${seconds}`
        }
    },[minutes,seconds ,activeCycle,])

   return(
     <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>  
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
     </CountdownContainer>
   ) 
}