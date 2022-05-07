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
    createColumn(event) {
      const name = event.target.value;
      if (name) {
        this.columns.push({
          name,
          tasks: [],
        });

        event.target.value = "";
      }
    },
    createTask(event, { columnIndex }) {
      const name = event.target.value;

      if (name) {
        this.columns[columnIndex].tasks.push({
          name,
          id: uuid(),
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
    moveTask({ fromColumnIndex, toColumnIndex, fromTaskIndex, toTaskIndex }) {
      const taskToMove = this.columns[fromColumnIndex].tasks.splice(
        fromTaskIndex,
        1
      )[0];

      const toTasks = this.columns[toColumnIndex].tasks;
      const toTaskIndexNormalized =
        toTaskIndex === undefined ? toTasks.length : toTaskIndex;

      toTasks.splice(toTaskIndexNormalized, 0, taskToMove);
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
    pickupColumn(event, { fromColumnIndex }) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("from-column-index", fromColumnIndex);
      event.dataTransfer.setData("type", "column");
    },
    dropItem(event, payload) {
      const type = event.dataTransfer.getData("type");

      console.log(type);

      type === "task"
        ? this.dropTask(event, payload)
        : this.dropColumn(event, payload);
    },
    dropTask(event, { toColumnIndex, toTaskIndex }) {
      const fromTaskIndex = event.dataTransfer.getData("task-index");
      const fromColumnIndex = event.dataTransfer.getData("from-column-index");

      this.moveTask({
        fromColumnIndex,
        toColumnIndex,
        fromTaskIndex,
        toTaskIndex,
      });
    },
    dropColumn(event, { toColumnIndex }) {
      const fromColumnIndex = event.dataTransfer.getData("from-column-index");

      this.moveColumn({ fromColumnIndex, toColumnIndex });
    },
  },
});
