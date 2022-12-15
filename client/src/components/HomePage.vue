<template>
  <div>
    <input
      type="file"
      accept="image"
      enctype="multipart/form-data"
      @change="uploadImage"
    />
    <select>
      <option v-for="option in proessingOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import "../styles/HomePage.css";
import $axios from "../../apiRepository/globalRepository";
export default {
  data() {
    return {
      previewImage: null,
      processId: null,
      proessingOptions: [
        "binary",
        "grayscale",
        "blur",
        "edge",
        "sort",
        "resize",
        "flip",
        "rotate",
      ],
    };
  },
  methods: {
    async uploadImage(input) {
      const image = input.target.files[0];
      try {
        const { data } = await $axios.imageRepository.uploadImage(image);
        this.processId = data.processId;
        console.log(this.processId);
      } catch (error) {
        console.error(error);
        alert("Image uploading failed");
      }
    },
  },
};
</script>
