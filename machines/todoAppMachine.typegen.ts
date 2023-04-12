
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.Todo machine.Loading Todos:invocation[0]": { type: "done.invoke.Todo machine.Loading Todos:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.Todo machine.Loading Todos:invocation[0]": { type: "error.platform.Todo machine.Loading Todos:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "loadTodos": "done.invoke.Todo machine.Loading Todos:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "loadTodos";
        };
        eventsCausingActions: {
          "assignErrorToContext": "error.platform.Todo machine.Loading Todos:invocation[0]";
"assignTodosToContext": "done.invoke.Todo machine.Loading Todos:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "loadTodos": "xstate.init";
        };
        matchesStates: "Loading Todos" | "Loading todos errored" | "Todos Loaded";
        tags: never;
      }
  