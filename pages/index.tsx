import { todosMachine } from "@/machines/todoAppMachine"
import { useMachine } from "@xstate/react"

export default function Home() {
const [state, send] = useMachine(todosMachine)

  return (
    <div>{JSON.stringify(state.value)}
      <button onClick={()=>send('Todos loaded')}>Todos loaded</button>  
      <button onClick={()=>send('Loading todos failed')}>Loading todos failed</button>    
    </div>
  )
}
