<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        v-if="task"
        type="text"
        class="p-2 mr-2 flex-grow text-xl font-bold w-full"
        :value="task.name"
        @change="
          updateTaskProperty({
            columnName: route.params.column,
            id: route.params.id,
            field: 'name',
            value: $event.target.value,
          })
        "
      />
      <span v-else>task not found</span>
      <textarea
        v-if="task"
        class="relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal w-full"
        :value="task.description"
        @change="
          updateTaskProperty({
            columnName: route.params.column,
            id: route.params.id,
            field: 'description',
            value: $event.target.value,
          })
        "
      />
    </div>
  </div>
</template>

<script setup>
import { useBoardStore } from "../stores/boardStore";
import { useRoute } from "vue-router";
import { computed } from "vue";

const { getTask, updateTaskProperty } = useBoardStore();
const route = useRoute();
const task = computed(() => {
  return getTask(route.params.column, route.params.id);
});
</script>

<style scoped>
.task-view {
  @apply relative flex flex-row bg-white  mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
