import axios from "axios";

const imageRepository = {
  uploadImage: (image) => {
    const formData = new FormData();
    formData.append("file", image, image.name);
    return axios.post("http://localhost:4000/image", formData);
  },
};

export default imageRepository;
