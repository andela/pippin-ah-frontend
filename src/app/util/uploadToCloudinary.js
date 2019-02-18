import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { CLOUDINARY_URL, API_URL } = process.env;

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
      const {
        data: { secure_url: fileUrl },
      } = response;
      saveImage(page, fileUrl);
    })
    .catch(err => err);
};
export default uploadImage;
