<template>
  <div style="display: flex">
    <img :src="previewImage" />
    <div v-if="processedImage" style="display: flex; align-items: center">
      <div class="arrow">
        <div class="arrow-line"></div>
        <div class="arrow-head"></div>
      </div>
      <img :src="processedImage" v-if="processedImage" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    previewImage: {
      type: String,
      required: false,
    },
    processedImage: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
img {
  max-width: 300px;
  height: auto;
}

.arrow {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow-line {
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 25px solid black;
}
.arrow-head {
  width: 0;
  height: 0;
  border-top: 12.5px solid transparent;
  border-bottom: 12.5px solid transparent;
  border-left: 12.5px solid black;
}
</style>
