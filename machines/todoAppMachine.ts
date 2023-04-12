import { actions, assign, createMachine } from "xstate";

export const todosMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogAsAdgoBmJwDY3ATnv2PAJgCsHl4ANCAAnogAtACMrq4U0Voe-vZJtk4AHK4errYAvnmhQjgEJJwS9KSMQmxgAE51qHUURgA2KgBmTdgUxSJl4rSV1TJyCkrmmrr6liawZmqkljYIDs5unt5+gSHhUQEeFP6uvtmB6Vk5+YUgfaVivaOYFZCsAMJ1YCpgmOQA7jMkCA5gsLECVr4nAlbBlLlsDjkMqEIghfLZDk5fFporF-Mdok4tG4CkUZCVRJwPl9VFVfmA-phlDIKABlQioP5SLp1bCYMhGACuylYADFunzSILlJgiLgqpBAcZTJNlohokEKL4cZsfAj7MjEFqMhQMuk8bYtPjCcSSSBSOg4JY7hSwLNlYtVQgYjlNbZovY8b4sfYLUSDV6nGstCdsukHNaPE5bc6BtQhlIam75irwVFojDff7A8HQ05w5E0fEMm4CZGLtlcsmyf0HjVnkNIFnQUtc17a4WA-4g1oQ1ow3tUeiTVica48a4CUTXE2MOTUxUpEyWJh6o1PhAuznQCsYpCB8WR6Xw-mMWb-BarUuV8J7pTPiopP9GTJDx7e9F-GiTVtWyeEdn1CcCSAyMnHNS0F2tZcbhTB4qQ-Wkvy3VBWXZTlaW5Xl+SFX8wWPQ0nCA+MtFhIdtiCCCUUxLRNRyVwfHgxcbQKIA */
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    id: "Todo machine",
    initial: "Loading Todos",
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
      },
      events: {} as {
        type: 'Create new'
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
              }
            }
          },
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
