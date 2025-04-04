import { useFormContext } from "react-hook-form"
import { FormContainer, MinutesAmountInput,TaskInput } from "./styles"
import { useContext } from "react"
import { CyclesContext } from "../../../../contexts/CyclesContext"


export function NewCycleForm(){
  const {activeCycle}= useContext(CyclesContext)
  const { register} = useFormContext()
   return(
        
            <FormContainer>
              <label htmlFor="task"> vou Trabalhar em </label>
              <TaskInput 
              id="task" 
              list="task-suggestinos"
              placeholder="De um nome para o seu projeto"
              disabled={!!activeCycle}
              {...register('task')}
              />

               <datalist id="Task-suggetions"> 
                <option value="Projeto 1"/>
                <option value="Projeto 2"/>
                <option value="Projeto 3"/>
                <option value="Banana"/>
               </datalist>

              <label htmlFor="minutesAmount">durante</label>
              <MinutesAmountInput 
                type="number" 
                id="minutesAmount" 
                placeholder="00"
                step={5} 
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount',{valueAsNumber:true})}
               />

              <span>minutos</span>
            </FormContainer>
    )
}