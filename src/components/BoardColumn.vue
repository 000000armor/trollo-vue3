<template>
  <div
    class="column"
    draggable="true"
    @dragstart.self="pickupColumn($event, { fromColumnIndex: columnIndex })"
    @drop="dropItem($event, { toColumnIndex: columnIndex })"
    @dragover.prevent
    @dragenter.prevent
  >
    <h4 class="flex items-center mb-2 font-bold">
      {{ column.name }}
    </h4>

    <TransitionGroup name="tasks" tag="ul">
      <BoardTask
        v-for="(task, taskIndex) in column.tasks"
        :key="task.id"
        :task="task"
        :task-index="taskIndex"
        :column-index="columnIndex"
      />
      <li class="task" key="random-input">
        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task name"
          @keyup.enter="createTask($event, { columnIndex })"
        />
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup>
import BoardTask from "../components/BoardTask.vue";
import { useBoardStore } from "../stores/boardStore";

const { createTask, pickupColumn, dropItem } = useBoardStore();

defineProps({
  column: Object,
  columnIndex: Number,
});
</script>

<style>
.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
