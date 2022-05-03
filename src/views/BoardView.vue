<template>
  <div class="p-4 bg-teal-200 h-full overflow-auto">
    <div class="flex flex-row items-start">
      <div
        v-for="columnName of columnNames"
        :key="columnName"
        class="column"
        @drop="dropTask($event, columnName)"
        @dragover.prevent
        @dragenter.prevent
      >
        <h4 class="flex items-center mb-2 font-bold">
          {{ columnName }}
        </h4>

        <TransitionGroup name="tasks" tag="ul">
          <li
            v-for="(task, taskIndex) in board.columns[columnName].tasks"
            :key="task.id"
            class="task"
            @click="goToTask(columnName, task.id)"
            draggable="true"
            @dragstart="
              pickupTask($event, { taskIndex, fromColumnName: columnName })
            "
          >
            <div class="w-full relative">
              <span class="w-full flex-shrink-0 font-bold">{{
                task.name
              }}</span>

              <p
                class="cursor-pointer absolute top-0 right-0"
                @click.stop="removeTask(columnName, task.id)"
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
              placeholder="+ Enter new task"
              @keyup.enter="createTask($event, columnName)"
            />
          </li>
        </TransitionGroup>
      </div>
    </div>
    <!--    move modal to separate module -->
    <Teleport to="#modal">
      <div
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-gray-50 bg-opacity-75"
        v-if="isTaskOpened"
        @click.self="closeModal"
      >
        <RouterView />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { useBoardStore } from "../stores/boardStore";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const { board, createTask, removeTask, pickupTask, dropTask } = useBoardStore();
const route = useRoute();
const router = useRouter();

const columnNames = computed(() => Object.keys(board.columns));
const isTaskOpened = computed(() => route.name === "task");

const goToTask = (column, id) =>
  router.push({ name: "task", params: { column, id } });

const closeModal = () => router.push({ name: "board" });
</script>

<style scoped>
.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline;
}

.task-bg {
  background: rgba(0, 0, 0, 0.5);
}

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
