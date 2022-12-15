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
    };
  },
  methods: {
    uploadImage(input) {
      const image = input.target.files[0];
      try {
        $axios.imageRepository.uploadImage(image);
      } catch (error) {
        console.error(error);
        alert("Image uploading failed");
      }
    },
  },
};
</script>
