import { MyMachine } from "@/machines/myFirstMachine"
import { useMachine } from "@xstate/react"

export default function Home() {
const [state, send] = useMachine(MyMachine)

  return (
    <div>{JSON.stringify(state.value)}
      <button onClick={()=>send('MOUSEOVER')}>Mouse over</button>  
      <button onClick={()=>send('MOUSEOUT')}>Mouse out</button>    
    </div>
  )
}
