import { todosMachine } from "@/machines/todoAppMachine";
import { useMachine } from "@xstate/react";

const todos = new Set<string>(["Take bins out", "Do laundry"]);

export default function Home() {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput);
      },
      deleteTodo:async (context, event) => {
        // throw Error('Oh no!')
        todos.delete(event.todo)
      }
    },
  });

  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {state.matches('Todos Loaded') && (
          <>
            {state.context.todos.map(todo => (
              <div key={todo} style={{display: 'flex', alignItems: 'center'}}>
                <p>{todo}</p>
                <button onClick={()=>{
                  send({
                    type: "Delete",
                    todo
                  })
                }}>
                  Delete
                </button>
              </div>
            ))}
          </>
        )}
        {state.matches("Todos Loaded") && (
          <button
            onClick={() => {
              send({
                type: "Create new",
              });
            }}
          >
            Create new
          </button>
        )}
        {state.matches('Deleting todo errored') && (
          <>
            <p>Something went wrong: {state.context.errorMessage}</p>
            <button onClick={()=>{
              send('Speed up')
            }}>Go back to list</button>
          </>
        )}
        {state.matches("Creating new todo.Showing form input") && (
          <form onSubmit={(e) => {
            e.preventDefault()
            send({
              type: "Submit"
            })
          }}>
            <input
              onChange={(e) => {
                send({
                  type: "Form input changed",
                  value: e.target.value,
                });
              }}
            ></input>
          </form>
        )}
      </div>
    </div>
  );
}
