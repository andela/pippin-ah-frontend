import dotenv from 'dotenv';
import cloudinary from 'cloudinary-core';

dotenv.config();
console.log('*****', process.env.CLOUDINARY_CLOUD_NAME);

const uploadToCloudinary = imageFilePath => {
  cloudinary.config({
    cloud_name: 'learnground',
    api_key: '164924858245978',
    api_secret: 'RBwhdIbjYY_4unXZItlvT6k1cWc',
  });

  let response = '';
  cloudinary.v2.uploader
    .upload(imageFilePath, (error, result) => {
      if (error) response = error;
      response = result.url;
    })
    .catch(error => error);

  return response;
};

export default uploadToCloudinary;

/* This should be called inside an async function */
/* const response = await uploadToCloudinary(coverImageUrl); */
