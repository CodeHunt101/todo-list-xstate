import { actions, assign, createMachine } from "xstate";

export const todosMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMADgBsFewGYArAE5XAdncAaEABPRABaRwAWCkcARh8Y+z8AXyTAoRwCEk4JelJGITYwACci1CKKIwAbFQAzMuwKdJEs8Vpc-Jk5BSVzTV19SxNYMzVSSxsEUM8KXwDgsPiKTy1bVwjZlNSQUnQ4SybMsUHTXvGwmMdnLS0fexjbOZDJmK8KCJW1ja2D0Wy2qQKx2GpyQ1kQMVctgoDmWjgegSeEK0M1cnns62S3xkGV+gk6mBykCBIwsoImkJib3sWgijkSj0QrhilPcTIeKTS2OaYmo-zymGU+OKpSKRNBQxJYzJ5wSFGut3uDIQEWZLi09i8XxSQA */
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    id: "Todo machine",
    initial: "Loading Todos",
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
      },
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
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

      "Todos Loaded": {},
      "Loading todos errored": {},
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
    },
  }
);
