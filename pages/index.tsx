import { todosMachine } from "@/machines/todoAppMachine"
import { useMachine } from "@xstate/react"

export default function Home() {
const [state, send] = useMachine(todosMachine)

  return (
    <div>{JSON.stringify(state.value)}
      <button onClick={()=>send({
        type: 'Todos loaded',
        todos: ['Take bins out']
      })}>Todos loaded</button>  
      
      <button onClick={()=>send({
        type: 'Loading todos failed', 
        errorMessage: 'Oh no!'
        })}>Loading todos failed</button>    
    </div>
  )
}
