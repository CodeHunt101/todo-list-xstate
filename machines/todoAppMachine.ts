import { actions, assign, createMachine } from "xstate";

export const todosMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0ATgBsFAMwBWAIxvHWgBwAWAHZfRx9AgBoQAE87D3tfCi0Xey1Hf2T7F38tNwBfXMihHAISTgl6UkYhNjAAJ1rUWoojABsVADNG7AoikVLxWgqqmTkFJXNNXX1LE1gzNVJLGwQHZ3cvHwDg0K0I6LsAJnsPCn97A49fFKdvN0D8wpli0U5qzHLIVgBhWrAVMEw5AA7tMkCBZvMLGDlrYPActBQ3MktGc0iErr5fJEYggDoEER5soEjnE3H4Qg8QL0SmIKD8-qpKoCwEDMMoZBQAMqEVBAqSdWrYTBkIwAV2UrAAYl1haQxcpMERcJVIKDjKYJktEHDAhQDi4Ub5Ao4rscXAcsfsVoSTgczvZifZPL5CfcClSnn1afSVFJgWyOdzefyZSLxaxOaKAEbYMxq8EahZahBpfx6y7G43m-yODx7HEOBEok1BJ2XV2U6kvSg+xmMf3sjBc3DcKSN1DsdSUBQCHqemmcWt+lkBpuclttmTyUi8cYLfTxiGa6GxLQHRH4g1+PyOc1ObGIFyBE4hQIuDwmzyBY2Eyv96t036+pkNwMTpnt1h1BpNVodLp9hgzz9I+DLDqy7bNq2H5TmMvrqAuugzImUKgMsx7OBsFouL47jZHmB4IHmCRaJkmJHA6xJaB4Lj5O6pDoHAlhVv0yFzMuaF2EiLgUL4Wi7C6BxuIRthHgk9jnJc1yOLcbqPEBXplIMUjVGxkKLCuKwkhQ5xOEawlWrYeIJMa3jmo4drZKkd4KQOggjO8gyQGpHHWHY-i+G4vH8cEcIGTiFxeYETgOscTrkhZNnCHZ1DKTBLCYN+jTOWCS5JppRmhDpRwmoE-nanmpyEqRHiEkEnjUVFwHek+dbMhBMguelnEIMFeoGh5xqmjRFoiQcFoUIE9qOs6FbuixNVgS+I6QUGfJMgKQphsoTWoW5CDns4RpXP4NHnJ5LiHYRmKuBe5W+EJHluBcVWKTWtXgaOqBQZOGCrRpLXlbx7hOp42a5qEhGHWmunBQcuYuI4x6+HRuRAA */
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    id: "Todo machine",
    initial: "Loading Todos",
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
        saveTodo: {
          data: void
        }
      },
      events: {} as {
        type: 'Create new'
      } | {
        type: 'Submit'
      } | {
        type: 'Form input changed',
        value: string
      }
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
      createNewTodoFormInput: ""
    },
    states: {
      "Loading Todos": {
        invoke: {
          src: "loadTodos",
          onDone: [
            {
              target: "Todos Loaded",
              actions: "assignTodosToContext",
            },
          ],
          onError: [
            {
              target: "Loading todos errored",
              actions: "assignErrorToContext",
            },
          ],
        },
      },

      "Todos Loaded": {
        on: {
          "Create new": "Creating new todo"
        }
      },

      "Loading todos errored": {},

      "Creating new todo": {
        initial: "Showing form input",
        states: {
          "Showing form input": {
            on: {
              "Form input changed": {
                actions: "assignFormInputFormToContext"
              },

              Submit: "Saving todo"
            }
          },

          "Saving todo": {
            invoke: {
              src: "saveTodo",

              onError: {
                target: "Showing form input",
                actions: 'assignErrorToContext'
              },

              onDone: "#Todo machine.Loading Todos"
            }
          }
        },
      }
    },
  },
  {
    actions: {
      assignTodosToContext: assign((context, event) => {
        return {
          todos: event.data,
        };
      }),
      assignErrorToContext: assign((context, event) => {
        return {
          errorMessage: (event.data as Error).message,
        };
      }),
      assignFormInputFormToContext: assign((context, event) => {
        return {
          createNewTodoFormInput: event.value
        }
      })
    },
  }
);
