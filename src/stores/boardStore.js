import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import initialBoardData from "../../stubs/initialBoardData";

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    board: useStorage("board", initialBoardData),
  }),
  getters: {
    getTask: (state) => (columnName, id) => {
      return state.board.columns[columnName]?.tasks.find(
        (task) => task.id === id
      );
    },
  },
  actions: {
    createTask(event, columnName) {
      let value = event.target.value;

      if (value) {
        this.board.columns[columnName].tasks.push({
          id: uuid(),
          name: value,
        });

        event.target.value = "";
      }
    },
    removeTask(columnName, id) {
      const column = this.board.columns[columnName];
      column.tasks = column.tasks.filter((task) => task.id !== id);
    },
    updateTaskProperty(event, { columnName, id, field }) {
      const task = this.board.columns[columnName].tasks.find(
        (task) => task.id === id
      );

      task[field] = event.target.value;
    },
  },
});
