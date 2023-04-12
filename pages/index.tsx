import { todosMachine } from "@/machines/todoAppMachine"
import { useMachine } from "@xstate/react"

export default function Home() {
const [state, send] = useMachine(todosMachine, {
  services: {
    loadTodos: async () => {
      return ['Take bins out', 'Do laundry']
    }
  }
})

  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {state.matches('Todos Loaded') && (
        <button
          onClick={()=> {
            send({
              type: "Create new"
            })
          }}
        >
          Create new
        </button>)}
        {state.matches('Creating new todo.Showing form input') && (
          <input onChange={e => {
            send({
              type: "Form input changed",
              value: e.target.value
            })
          }}>
          </input>
        )}
      </div>
    </div>
  )
}
