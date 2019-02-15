import axios from 'axios';
import dotenv from 'dotenv';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/hba821/image/upload';

const url = 'https://learnground-api-staging.herokuapp.com/api/v1/profile';

dotenv.config();

export const saveImage = pictureurl => {
  const token = localStorage.getItem('token');
  const defaultOptions = {
    headers: {
      Authorization: token,
    },
  };
  return axios
    .patch(
      url,
      {
        imageUrl: pictureurl,
      },
      defaultOptions,
    )
    .then(({ data }) => {
      console.log(data);
    })
    .catch(({ response }) => {
      console.log(response);
    });
};

const uploadImage = imageData => {
  return axios
    .post(CLOUDINARY_URL, imageData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    .then(response => {
      const data = response.data;
      const fileURL = data.secure_url;
      saveImage(fileURL);
    })
    .catch(err => err);
};
export default uploadImage;
