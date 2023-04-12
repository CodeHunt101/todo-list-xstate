import { createMachine } from "xstate";

export const MyMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAtADZ0AT0FDkaEMXLVadAHTZ2ACSwA3MACdIjFm07c+iACwAmMYgAcARkUBWKelmUa9RRU069SZqw4uHj9+BAcHRQAGB0iAdjtzBysEW1NIqSkgA */
  initial: "notHovered",
  states: {
    notHovered: {
      on: {
        MOUSEOVER: {
          target: "hovered"
        }
      }
    },
    hovered:{
      on: {
        MOUSEOUT: {
          target: "notHovered"
        }
      }
    }
  }
})