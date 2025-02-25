import {  Play , HandPalm} from "phosphor-react";
import {  HomeContainer,StartCountdownButton, StopCountdownButton,  } from "./styles";
import {zodResolver} from '@hookform/resolvers/zod';
import {FormProvider, useForm} from "react-hook-form"
import * as zod from 'zod'
import {  useContext} from "react";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task:zod.string().min(1,'informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(1,'o ciclo precisa  ser de no minimo 5 minutos')
  .max(60,'o cilo precisa ser no maximo 60 minutos'),
})

type  NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

    const {activeCycle,CreateNewCycle,InterruptCurrentCycle} = useContext(CyclesContext)

    

      const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task:'',
            minutesAmount:0,
        }
      })

      const { handleSubmit , watch , reset }= newCycleForm

      function handleCreateNewCycle (data: NewCycleFormData){
        CreateNewCycle(data)
        reset()

      }
    const task = watch('task')
    const isSubmitDisabled = !task
    
    return(
        <HomeContainer>
         <form  onSubmit={handleSubmit(handleCreateNewCycle)} action="">

             <FormProvider { ...newCycleForm}>
                 <NewCycleForm/>
             </FormProvider>
             <Countdown />
            
            
            {activeCycle?(
                <StopCountdownButton  onClick={InterruptCurrentCycle} type="button">
                <HandPalm size={24}/>
                 Interromper 
               </StopCountdownButton>
            ):(
                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                 <Play size={24}/>
                 começar
                </StartCountdownButton>
            )}

         </form>
        </HomeContainer>
    )
}