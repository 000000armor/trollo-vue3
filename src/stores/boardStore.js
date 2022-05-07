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
      return (columnIndex, taskId) => {
        const tasks = this.columns[columnIndex].tasks;

        return tasks.find((task) => taskId === task.id);
      };
    },
  },
  actions: {
    createTask(event, { columnIndex }) {
      let value = event.target.value;

      if (value) {
        this.columns[columnIndex].tasks.push({
          id: uuid(),
          name: value,
        });

        event.target.value = "";
      }
    },
    removeTask({ columnIndex, taskId }) {
      const column = this.columns[columnIndex];
      column.tasks = column.tasks.filter((task) => task.id !== taskId);
    },
    updateTaskProperty({ columnIndex, taskId, field, value }) {
      const task = this.columns[columnIndex].tasks.find(
        (task) => task.id === taskId
      );

      task[field] = value;
    },
    moveTask({ fromColumnIndex, toColumnIndex, taskIndex }) {
      const taskToMove = this.columns[fromColumnIndex].tasks.splice(
        taskIndex,
        1
      )[0];

      this.columns[toColumnIndex].tasks.push(taskToMove);
    },
    moveColumn({ fromColumnIndex, toColumnIndex }) {
      const columnToMove = this.columns.splice(fromColumnIndex, 1)[0];

      this.columns.splice(toColumnIndex, 0, columnToMove);
    },
    pickupTask(event, { taskIndex, fromColumnIndex }) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("task-index", taskIndex);
      event.dataTransfer.setData("from-column-index", fromColumnIndex);
      event.dataTransfer.setData("type", "task");
    },
    pickupColumn(event) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("type", "column");
    },
    dropTask(event, { toColumnIndex }) {
      const taskIndex = event.dataTransfer.getData("task-index");
      const fromColumnIndex = event.dataTransfer.getData("from-column-index");

      this.moveTask({ fromColumnIndex, toColumnIndex, taskIndex });
    },
  },
});
