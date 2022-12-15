<template>
  <div>
    <input
      type="file"
      accept="image"
      enctype="multipart/form-data"
      @change="uploadImage"
    />
  </div>
</template>

<script>
import $axios from "../../apiRepository/globalRepository";
export default {
  data() {
    return {
      previewImage: null,
      processId: null,
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
