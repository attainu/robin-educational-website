import pkg from 'cloudinary';
const { v2:cloudinary } = pkg;

// cloudinary config
import { cloud_name, api_key, api_secret } from '../config/cloudinary.js';

// config for cloudinary
cloudinary.config({
    cloud_name,
    api_key,
    api_secret
});


const fileUploader = (path) => {
    return new Promise((res, rej) => {
        cloudinary.uploader.upload(path, (err, file) => {
            if(err) return rej(err);
            res(file);
        });
    });
};

export default fileUploader;