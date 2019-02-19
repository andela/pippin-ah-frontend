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

const uploadImage = (page, imageUrl) => {
  const formData = new FormData();
  formData.append('tags', page);
  formData.append('upload_preset', 'u5wlpktm');
  formData.append('timestamp', Date.now() / 1000);
  formData.append('file', imageUrl);
  return axios
    .post(CLOUDINARY_URL, formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    .then(response => {
      const data = response.data;
      const fileURL = data.secure_url;

      saveImage(page, fileURL);
      return data;
    })
    .catch(err => err);
};
export default uploadImage;
