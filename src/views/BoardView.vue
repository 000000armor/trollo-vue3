<template>
  <div class="p-4 bg-teal-200 h-full overflow-auto">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, columnIndex) of columns"
        :key="column.name"
        :column="column"
        :columnIndex="columnIndex"
      />
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
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBoardStore } from "../stores/boardStore";
import BoardColumn from "../components/BoardColumn.vue";

const { board, createColumn } = useBoardStore();

const route = useRoute();
const router = useRouter();

const columns = computed(() => board.columns);
const isTaskOpened = computed(() => route.name === "task");

const closeModal = () => router.push({ name: "board" });
</script>
