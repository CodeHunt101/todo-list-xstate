
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
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
  