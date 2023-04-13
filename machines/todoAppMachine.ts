import { actions, assign, createMachine } from "xstate";

export const todosMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMAVlsV7AdgAcARltvHtgMwAbAEANCAAnoj2XhQutgH2AX5uPrb+tgC+6aFCOAQknBL0pIxCbByUCgIUOSL54rRFJTJyCkrmmroaHgZIICawZmqkljYI9j4xtgAsLlP2flMAnFqLLouhEQhzfhTejlq2HgGHi7YumdkyuaIFDVKlrGAATk+oTxRGADYqAGZv2NUrrUxNQ7sVpCx5KReG0hvp9JZ+oMLL1Rg4nK5PHtUoEQuFEGsXBQPGsAm4Fst7AlzlkQDU8iDSphCpBWABhJ5gFRgTDkADuCN6SPaI0QblsG0QHimUwCzi07j8i3Gi1V9gudKBDM4TJZEFYABEwJ8wMowILjKYRajEABaaVOaVaY72SUIDx+RwUHweKmLKZ+dz2RYeDX0m6UDlc1Tg-mYZQyCgAZUIqD5Uj+T2wmDIRgArspWAAxf450j55SYIi4YqQC19K1DUUIQOLChJbxaLQzeb7KZu6XuGKY+yyoLOvxhrURihRlRSOMJjDJ1Pp8GZ7O5gusJN5gBG2DM9eFTZtCESbb8XiWQdsiwCawH4yJawDUw8q1OHoCU4w1zqs6cvOsZgHy8aJkmuDcFIS6oOw6gVNC-CCNOAFzjGjCLhBUEwTIUIwvO6jwroiKNiioBolMGLuF4KT+EEbr3k4HZuFM3aLEk76TrS4ZoUBGG8qB4HLpB0HgrBjwvG8HzfMoG6An+wKcOhC5CbByY4eJeGtIRHR6CRQpkcMZ4Xu216rCk96Pvi7pLFM7bvrYWgLLMvoOL+wjapQRomgJEnlFwSFVLxII+aauEYPhii6cRPSWgM1oUQSEo2dKqwUF27gBKsVEeisHn-qFxrhVpGCSa87xfL8-wKZ5M5hX52lIbCRGdAZ8XIsZSUIA49gUPebguLMMweMk0yujZnjyl2WiDi4XZKj+PGoUVvkRVgzwVaySZGGAkCYHmRjHkZza9f1ZJDTKLijeKcxumcHi7HE8yBn4fhaINgQFUp3nFY1f6bW8rJWLAyjchQuA-GaTwABQOF2ACUrAhZwDXrZggOchAx0Jae3VnQNl0jWNd02TikzxPNsTKgsMqZLSpDoHAlgo2ApG4+R1h2h+WjEmxLpuracozbNXgkqN-rOd9XmgpI4KlOznXNraCTev68xeBNmwBNK-UkqsJLBp6srSzOuoNJAiuJVzYxKnzPhaBrBxYvdb0UAEs1Uu+AZOjSlyKTLhTrbAGNSVjVt4zbcxEm4ywPvEsczFMbhup4ba+scgZBPNH5TKbfHRqpYGwRHnOjG9j0sV2Paek5-apUqj0OGsfZKl7+cgipIHFxBq4ZqWW7KKXXVRx4j0BDKyfvhP4xXk+bi84cKysbECpWR3yn8UXwmoBpYmMCXhkcyPoysfZxw3s5hxHAxqVUpXQ3xAkMwTy46rLQH9V-etw+nfYvOBGuhdN62UqIDjOH1MaC8KQuCVFRDev01qlQ2mHS2R8lZnjAWTJyT1KZLFHNlBeed6ZAA */
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
              cond: "No todos"
            },
            {
              target: "Creating new todo"
            }
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
    guards: {
      "No todos": (context, event) => {
        return event.data.length === 0
      }
    },
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
