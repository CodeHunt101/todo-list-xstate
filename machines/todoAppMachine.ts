import { actions, assign, createMachine } from "xstate";

export const todosMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0ATgBsFAMwBWAIxvHWgBwAWAHZfRx9AgBoQAE87D3tfCi0Xey1Hf2T7F38tNwBfXMihHAISTgl6UkYhNjAAJ1rUWoojABsVADNG7AoikVLxWgqqmTkFJXNNXX1LE1gzNVJLGwQHZ3cvHwDg0K0I6LsAJnsPCn97A49fFKdvN0D8wpli0U5qzHLIVgBhWrAVMEw5AA7tMkCBZvMLGDlrYPActBQ3MktGc0iErr5fJEYggDoEER5soEjnE3H4Qg8QL0SmIeiN3oNPgARMAtMDKMCg4ymCZLOw+ZyOA4uEJaLy+QIijzYxB4hJHRz2QLHexkzGOSnUl6UH5-VSVQFgIGYZQyCgAZUIqCBUk6tWwmDIRgArspWAAxLqO0gu5SYIi4SqQLngnkLPkIOGBCjClESxxXY4uA5Y-YrQknA5nJVHTy+Qn3ApUp59Wm6lRSYEms2W622r1O12sc3OgBG2DMIYhvOhiDS-hjl0CjmHyf8jg8exxDgRKITQVVlwLmpLNM45f1jCrpowFtw3CkO9Q7HUlAUAjpGGe-QoG8rRuru-N+8PMnkpF44wW+i7YahoBhDwtAORF8RcLQ-D8RxkycGUEBcQIThCSUPATTxAmHQkVyvUt11+CsDW3GsXwNI9WDqBomlaDoukvYQ1x1fDN0NY0jz3A9SLfMYK3UH9dBmP9Fl7BBEOcDYUxFdxsknODJwSLRMkxI4lWJMUXGw+jtQoFk2WYsiKMaZo2mUO1ui1G8dPZV8MHfT8eMmPR+LBbtw2E2x-H8EDFxybwQkcMlMjgjyXAoYkXB8PEDjcA4JzyItzNpSy9JkE9OHPQRVy0pLrNQWzFHsviDGcwSI3cjzTizNEySSSVHDgvEQsXfw3F8FqgnAilKVIdA4EsBLyAEuYewA-k3AHIURR8cVJXzODbAQhJ7HOS4pXAsUNOvWlyikapBshISRpWEkKHOJwJTcOa5VC-zoJirNslSDbcIylgGToSA9uG6w7DGk5Lk8Dz0hyOFUxxS4EWVfyIJWlwgKSJ6GOoQYctgTADN+CBPtcw7bBi5xToTQILrTDxJ1OQkFNJjyiaAjwEa0u9CIfI8sf-b6RPsGNwP8eNEw8ZNQcOFNQuzEJvGVDD6ZvRmt2ZmsrRtA1TO9X1WYO9nYecCUrn8fnzlalxDbgzFXFQoIWqinnorp+LMulpj71Y4iOMYFniqG7H2fNihfHcVVPDHCdQjgw2B1O5UYv5kdLilxLWSsziMDV0qecFYVRWmkVdhDw2ToBlq2slKDY84bLE6wdGPvd-bSoOGKKALaL0OOJFoqCzyY2FfsI5FfENXyXIgA */
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
        },
        deleteTodo: {
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
      } | {
        type: 'Delete',
        todo: string
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
          "Create new": "Creating new todo",
          Delete: "Deleting todo"
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
      },

      "Deleting todo": {
        invoke: {
          src: 'deleteTodo',
          onError: {target: "Deleting todo errored", actions: "assignErrorToContext"},
          onDone: "#Todo machine.Loading Todos"
        }
      },

      "Deleting todo errored": {}
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
