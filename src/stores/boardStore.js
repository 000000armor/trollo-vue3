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
      console.log(columnName, id);
      return state.board.columns[columnName]?.tasks.find(
        (task) => task.id === id
      );
    },
    columns: (state) => state.board.columns,
  },
  actions: {
    createTask(event, columnName) {
      let value = event.target.value;

      if (value) {
        this.columns[columnName].tasks.push({
          id: uuid(),
          name: value,
        });

        event.target.value = "";
      }
    },
    removeTask(columnName, id) {
      const column = this.columns[columnName];
      column.tasks = column.tasks.filter((task) => task.id !== id);
    },
    updateTaskProperty({ columnName, id, field, value }) {
      const task = this.columns[columnName].tasks.find(
        (task) => task.id === id
      );

      task[field] = value;
    },
    moveTask({ fromColumnName, toColumnName, taskIndex }) {
      const taskToMove = this.columns[fromColumnName].tasks.splice(
        taskIndex,
        1
      )[0];

      this.columns[toColumnName].tasks.push(taskToMove);
    },
    pickupTask(event, { taskIndex, fromColumnName }) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("task-index", taskIndex);
      event.dataTransfer.setData("from-column-name", fromColumnName);
    },
    dropTask(event, toColumnName) {
      const taskIndex = event.dataTransfer.getData("task-index");
      const fromColumnName = event.dataTransfer.getData("from-column-name");

      this.moveTask({ fromColumnName, toColumnName, taskIndex });
    },
  },
});
