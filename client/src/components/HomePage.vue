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
    <img id="preview" :src="previewImage" />
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
      :placeholder="chosenImageProcessingOption.parameters"
    />
    <br />
    <input
      v-if="chosenImageProcessingOptionIdx !== false"
      type="submit"
      @click="submitImageProcessingOptions"
    />
  </div>
</template>

<script>
import "../../main.css";
import $axios from "../../apiRepository/globalRepository";
export default {
  data() {
    return {
      previewImage: null,
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
        : this.imageProcessingOptions[0];

      try {
        await $axios.imageRepository.submitImageProcessingOptions(
          this.processId,
          option,
          this.inputtedImageProcessingValue
        );
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

img {
  max-width: 300px;
  height: auto;
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
