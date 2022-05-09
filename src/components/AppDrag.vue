<template>
  <div
    draggable="true"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="handleDrag"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  transferData: Object,
});

const handleDrag = (event) => {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.setData("payload", JSON.stringify(props.transferData));
};
</script>
