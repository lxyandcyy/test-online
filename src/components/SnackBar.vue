<template>
  <div id="snackbar">
    <v-snackbar
      :value="snackbar"
      @input="$emit('input', $event)"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn dark text @click="$emit('input', false)">
        x
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: "",
      mode: "",
      timeout: 1000,
      x: null,
      y: "top",
    };
  },
  props: ["snackbar", "text"],
};
</script>

<style lang="scss"></style>
