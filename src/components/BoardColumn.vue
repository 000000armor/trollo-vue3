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
      <li
        v-for="(task, taskIndex) in column.tasks"
        :key="task.id"
        class="task"
        @click="goToTask(columnIndex, task.id)"
        draggable="true"
        @dragstart.self="
          pickupTask($event, { taskIndex, fromColumnIndex: columnIndex })
        "
        @drop.stop="
          dropItem($event, {
            toColumnIndex: columnIndex,
            toTaskIndex: taskIndex,
          })
        "
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="w-full relative">
          <span class="w-full flex-shrink-0 font-bold">{{ task.name }}</span>

          <p
            class="cursor-pointer absolute top-0 right-0"
            @click.stop="removeTask({ columnIndex, taskId: task.id })"
          >
            ❌
          </p>
        </div>
        <p class="w-full flex-shrink-0 mt-1 text-sm">
          {{ task.description }}
        </p>
      </li>
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
import { useBoardStore } from "../stores/boardStore";
import { useRouter } from "vue-router";

const router = useRouter();
const { createTask, removeTask, pickupTask, pickupColumn, dropItem } =
  useBoardStore();

const goToTask = (columnIndex, taskId) =>
  router.push({ name: "task", params: { columnIndex, taskId } });

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

.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline;
}

/* Styles for TransitionGroup */
.tasks-move, /* apply transition to moving elements */
.tasks-enter-active,
.tasks-leave-active {
  transition: all 0.5s ease;
}

.tasks-enter-from,
.tasks-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.tasks-leave-active {
  position: absolute;
}
</style>
