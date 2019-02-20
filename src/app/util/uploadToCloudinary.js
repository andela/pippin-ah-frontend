import axios from 'axios';

const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const API_URL = process.env.API_URL;

export const saveImage = (page, imageUrl) => {
  const token = localStorage.getItem('token');
  const defaultOptions = {
    headers: {
      Authorization: token,
    },
  };
  return axios
    .patch(
      `${API_URL}${page}`,
      {
        imageUrl,
      },
      defaultOptions,
    )
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      return response;
    });
};

export const uploadImage = (page, imageUrl, uploadFormData) => {
  let formData = new FormData();
  formData.append('file', imageUrl);
  if (uploadFormData) {
    formData = uploadFormData;
  }
  formData.append('tags', page);
  formData.append('upload_preset', 'u5wlpktm');
  formData.append('timestamp', Date.now() / 1000);
  return axios
    .post(CLOUDINARY_URL, formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    .then(response => {
      const data = response.data;
      const fileURL = data.secure_url;
      saveImage(page, fileURL);
      return fileURL;
    })
    .catch(err => {
      return err;
    });
};
export default uploadImage;
