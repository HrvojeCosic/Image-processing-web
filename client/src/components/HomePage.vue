<template>
  <div>
    <h1>Image Upload</h1>
    <p>Select an image to upload:</p>

    <input
      type="file"
      accept="image"
      enctype="multipart/form-data"
      @change="handleImageInput"
      id="fileInput"
    />
    <br />
    <br />
    <ImageTransition
      :preview-image="previewImage"
      :processedImage="processedImage"
    />
    <br />
    <br />
    <select
      ref="optionSelector"
      v-if="imageProcessingOptions.length"
      @change="chooseImageProcessingOption"
    >
      <option
        v-for="option in imageProcessingOptions"
        :key="option"
        :value="option"
      >
        {{ option.name }}
      </option>
    </select>
    <br />
    <input
      v-if="
        chosenImageProcessingOptionIdx &&
        chosenImageProcessingOption.parameters[0].length
      "
      v-model="inputtedImageProcessingValue"
      type="text"
      :placeholder="`${chosenImageProcessingOption.parameters} (${chosenImageProcessingOption.possible_values})`"
    />
    <br />
    <input
      v-if="chosenImageProcessingOptionIdx !== false"
      type="submit"
      @click="submitImageProcessingOptions"
      style="cursor: pointer"
    />
  </div>
</template>

<script>
import "../../main.css";
import $axios from "../../apiRepository/globalRepository";
import ImageTransition from "./ImageTransition.vue";
export default {
  components: {
    ImageTransition,
  },
  data() {
    return {
      previewImage: null,
      processedImage: null,
      processId: null,
      chosenImageProcessingOptionIdx: null,
      inputtedImageProcessingValue: "",
      imageProcessingOptions: [],
    };
  },
  computed: {
    chosenImageProcessingOption() {
      if (!this.chosenImageProcessingOptionIdx) {
        return;
      }
      return this.imageProcessingOptions[this.chosenImageProcessingOptionIdx];
    },
  },
  methods: {
    async handleImageInput(input) {
      const image = input.target.files[0];
      this.updateImagePreview(image);

      try {
        const { data } = await $axios.imageRepository.uploadImage(image);
        this.processId = data.processId;
        console.log(data);
        this.imageProcessingOptions = data.imageProcessingOptions || [];
      } catch (error) {
        console.error(error);
        alert("Image uploading failed");
      }
    },
    updateImagePreview(image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener("load", () => {
        this.previewImage = reader.result;
      });
    },
    chooseImageProcessingOption() {
      const selectElement = this.$refs.optionSelector;
      this.chosenImageProcessingOptionIdx = selectElement.selectedIndex;
    },
    async submitImageProcessingOptions() {
      const option = this.chosenImageProcessingOptionIdx
        ? this.imageProcessingOptions[this.chosenImageProcessingOptionIdx].name
        : this.imageProcessingOptions[0].name;

      try {
        const res = await $axios.imageRepository.submitImageProcessingOptions(
          this.processId,
          option,
          this.inputtedImageProcessingValue
        );
        const url = URL.createObjectURL(res.data);
        this.processedImage = url;
      } catch (error) {
        console.error(error);
        alert("Sending image processing parameters failed");
      }
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select,
input,
button {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin: 5px 0;
}
</style>
