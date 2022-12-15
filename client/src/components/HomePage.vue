<template>
  <div>
    <input
      type="file"
      accept="image"
      enctype="multipart/form-data"
      @change="uploadImage"
    />
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
    <input
      v-if="
        chosenImageProcessingOptionIdx &&
        chosenImageProcessingOption.parameters[0].length
      "
      type="text"
      :placeholder="chosenImageProcessingOption.parameters"
    />
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
      chosenImageProcessingOptionIdx: null,
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
    async uploadImage(input) {
      const image = input.target.files[0];
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
    chooseImageProcessingOption() {
      const selectElement = this.$refs.optionSelector;
      this.chosenImageProcessingOptionIdx = selectElement.selectedIndex;
    },
  },
};
</script>
