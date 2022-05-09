<template>
  <AppDrop
    @drop="
      (eventPayload) =>
        dropItem({
          toColumnIndex: columnIndex,
          toTaskIndex: taskIndex,
          ...eventPayload,
        })
    "
  >
    <AppDrag
      :transfer-data="{
        taskIndex,
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex,
        type: 'task',
      }"
      class="task"
      @click="goToTask(columnIndex, task.id)"
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
    </AppDrag>
  </AppDrop>
</template>

<script setup>
import { useBoardStore } from "../stores/boardStore";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import AppDrop from "./AppDrop.vue";
import AppDrag from "./AppDrag.vue";

const router = useRouter();
const { removeTask, dropItem } = useBoardStore();

const goToTask = (columnIndex, taskId) =>
  router.push({ name: "task", params: { columnIndex, taskId } });

defineProps({
  columnIndex: Number,
  taskIndex: Number,
  task: Object,
});
</script>

<style scoped>
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
