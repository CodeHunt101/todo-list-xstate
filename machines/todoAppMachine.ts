import { createMachine } from "xstate";

export const todosMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxM6rJgDa0SQBtAAwBdRKAAOnYgBdiqUuJAAPRACYAjGooAWAOwA2AKwG1RgDQgAnog06jFMwF8nljjgIly1PgybpOVho6PxkArgAzXGJuQVElKVhZeUUkFUQAWj01SxsENSEDCiMXVxBSdDgldzwiMjAE6TkFJVUEDK0hXMQTYpc3AI8672D6UkYOeDTE5Ja0tp0ADm6EOx1+kBrPeopJzFHIRqTm1NAF5et1PUW+sq3hylHQ8MwwACc31DfD6aaU1sQSxWOg0AGZSk4gA */
  id: "Todo machine",
  initial: "Loading Todos",
  states: {
    "Loading Todos": {
      on: {
        "Todos loaded": {
          target: "Todos Loaded",
        },

        "Loading todos failed": { 
          target: "Loading todos errored" 
        },
      },
    },

    "Todos Loaded": {},
    "Loading todos errored": {},
  },
});