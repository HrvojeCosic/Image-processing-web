import axios from "axios";

const imageRepository = {
  uploadImage: (image) => {
    const formData = new FormData();
    formData.append("file", image, image.name);
    return axios.post("http://localhost:4000/image", formData);
  },

  submitImageProcessingOptions: (processId, option, value) => {
    return axios.post("http://localhost:4000/image/processingOptions", {
      processId,
      processingOption: option,
      processingValue: value,
    });
  },
};

export default imageRepository;
