import { actions, assign, createMachine } from "xstate";

export const todosMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0ATgBsFAMwBWAIxvHWgBwAWAHZfRx9AgBoQAE87D3tfCi0Xey1Hf2T7F38tNwBfXMihHAISTgl6UkYhNjAAJ1rUWoojABsVADNG7AoikVLxWgqqmTkFJXNNXX1LE1gzNVJLGwQHZ3cvHwDg0K0I6LsAJnsPCn97A49fFKdvN0D8wpli0U5qzHLIVgBhWrAVMEw5AA7tMkCBZvMLGDlrYPActBQ3MktGc0iErr5fJEYggDoEER5soEjnE3H4Qg8QL0SmIeiN3oNPgARMAtMDKMCg4ymCZLOw+ZyOA4uEJaLy+QIijzYxB4hJHRz2QLHexkzGOSnUl6UH5-VSVQFgIGYZQyCgAZUIqCBUk6tWwmDIRgArspWAAxLqO0gu5SYIi4SqQLngnkLPkIOGBCjClESxxXY4uA5Y-YrQknA5nJVHTy+Qn3ApUp59Wm6lRSYEms2W622r1O12sc3OgBG2DMIYhvOhiDS-hjl0CjmHyf8jg8exxDgRKITQVVlwLmpLNM45f1jCrpowFtw3CkO9Q7HUlAUAjpGGe-QoG8rRuru-N+8PMnkpF44wW+i7YahoBhDwtAORF8RcLQ-D8RxkycGUEBcQIThCSUPATTxAmHQkVyvUt11+CsDW3GsXwNI9WDqBomlaDoukvYQ1x1fDN0NY0jz3A9SLfMYK3UH9dBmP9Fl7BBEOcDYUxFdxsknODJwSLRMkxI4lWJMUXGw+jtQoFk2WYsiODPD9+EEVctJ09lXwwd9Px4yY9H4sFu3DYTbH8NzTizNEySSSVHDgvEXAoRd-DcXxQqCcCKSLLUb3MvSZHI+pGmaNplDtboYtpOLLNQazFFsviDEcwSI1c-wQMXHJvBCRwyUyOC3MC4kXB8PEDjcA4JzyaLTNi1kLM4q8KMaT4rFgZR-goXB2g5WoAAp2oggBKVhMs4bLBqwYbfggX85h7ADDlqihFXAhCDgutw3Dc-w4LHU4vDxUJ0na4VuseHCGO0-r4qGpKdubIwwEgTBnSMPbISEw6VlCE5Lk8G7wM8FM7t8ECLpatzlWFCVUnyItSHQOBLDWsABP25zodsfF7AoeHCUanI4VTacEISexznhPEoxTDTr1pcopGqcnIdKkkgoVCU3Dg2w5QoYdvGTIU3IgjUes+rS3g+CARYO6w7GuuGwoZ9ImZRtNLgRZVaogy4XBcICkj53CBkkTbYEwbbIF1yn9ZWTrnHOJwpdkycHuyY4GcCTwxWdr670Ih8jx9-8-eVGNwP8eNEw8ZMWcOFN5ezEJvGVDC460hOtyTmsrRtA10u9X0U6hv2HecCUrn8XPzjC+2XDgzFXFQoJQvarOOo8CubyrljH1QdicpbiNR4oXx3FVTwxwnUI7qyCWlXOCcWsQ3xp6yn6l+KinU5hLPBRxnxxUlXxdj3wLgtC8LJSg8-1svzant-re2vqLFyMc15iggkza6QQ0iD06mvccio0KdSSFPfGQA */
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
      } | {
        type: 'Speed up'
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

      "Deleting todo errored": {
        after: {
          "2500": "Todos Loaded"
        },

        on: {
          "Speed up": "Todos Loaded"
        }
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
