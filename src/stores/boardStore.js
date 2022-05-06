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
    columns: (state) => state.board.columns,
    getTask() {
      return (columnName, id) => {
        const tasks = this.columns?.find((column) => column.name).tasks;

        return tasks.find((task) => id === task.id);
      };
    },
    getColumn() {
      return (columnName) => {
        return this.columns.find((column) => column.name === columnName);
      };
    },
    getTasks() {
      return (columnName) => {
        return this.columns.find((column) => column.name === columnName).tasks;
      };
    },
  },
  actions: {
    createTask(event, columnName) {
      let value = event.target.value;

      if (value) {
        this.getTasks(columnName).push({
          id: uuid(),
          name: value,
        });

        event.target.value = "";
      }
    },
    removeTask(columnName, id) {
      const column = this.getColumn(columnName);
      column.tasks = column.tasks.filter((task) => task.id !== id);
    },
    updateTaskProperty({ columnName, id, field, value }) {
      const task = this.getTasks(columnName).find((task) => task.id === id);

      task[field] = value;
    },
    moveTask({ fromColumnName, toColumnName, taskIndex }) {
      const taskToMove = this.getTasks(fromColumnName).splice(taskIndex, 1)[0];

      this.getTasks(toColumnName).push(taskToMove);
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
