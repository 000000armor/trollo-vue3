<template>
  <div class="p-4 bg-teal-200 h-full overflow-auto">
    <div class="flex flex-row items-start">
      <div
        v-for="(column, columnIndex) of columns"
        :key="column.name"
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
              <span class="w-full flex-shrink-0 font-bold">{{
                task.name
              }}</span>

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
      <div class="column flex">
        <input
          class="block p-2 w-full bg-transparent"
          type="text"
          @keyup.enter="createColumn($event)"
          placeholder="+ Enter new column name"
        />
      </div>
    </div>
    <!--  TODO:  move modal to separate module -->
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

const {
  board,
  createTask,
  createColumn,
  removeTask,
  pickupTask,
  pickupColumn,
  dropItem,
} = useBoardStore();

const route = useRoute();
const router = useRouter();

const columns = computed(() => board.columns);
const isTaskOpened = computed(() => route.name === "task");

const goToTask = (columnIndex, taskId) =>
  router.push({ name: "task", params: { columnIndex, taskId } });

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
</style>
