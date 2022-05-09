<template>
  <div @drop.stop="handleDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["drop"]);

const handleDrop = (event) => {
  const transferData = JSON.parse(event.dataTransfer.getData("payload"));

  emit("drop", transferData);
};
</script>

<style scoped></style>
