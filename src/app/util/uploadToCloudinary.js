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

const uploadImage = (page, imageData) => {
  axios
    .post(CLOUDINARY_URL, imageData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    .then(response => {
      const data = response.data;
      const fileURL = data.secure_url;

      saveImage(page, fileURL);
    })
    .catch(err => err);
};
export default uploadImage;
