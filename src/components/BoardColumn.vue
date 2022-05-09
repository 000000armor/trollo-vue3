<template>
  <AppDrop
    @drop="
      (eventPayload) =>
        dropItem({ toColumnIndex: columnIndex, ...eventPayload })
    "
  >
    <AppDrag :transfer-data="{ fromColumnIndex: columnIndex, type: 'column' }">
      <div class="column">
        <h4 class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </h4>

        <TransitionGroup name="tasks" tag="ul">
          <BoardTask
            v-for="(task, taskIndex) in column.tasks"
            :key="task.id"
            :column-index="columnIndex"
            :task="task"
            :task-index="taskIndex"
          />
          <li key="random-input" class="task">
            <input
              class="block p-2 w-full bg-transparent"
              placeholder="+ Enter new task name"
              type="text"
              @keyup.enter="createTask($event, { columnIndex })"
            />
          </li>
        </TransitionGroup>
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script setup>
import BoardTask from "../components/BoardTask.vue";
import { useBoardStore } from "../stores/boardStore";
import AppDrop from "./AppDrop.vue";
import AppDrag from "./AppDrag.vue";

const { createTask, dropItem } = useBoardStore();

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
