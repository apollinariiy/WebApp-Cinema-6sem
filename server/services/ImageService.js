const { v2: cloudinary } = require('cloudinary');
const ApiError = require('../exceptions/error');
require('dotenv').config();

cloudinary.config({ 
  cloud_name: 'dgugjupdo', 
  api_key: '238154281451427', 
  api_secret: process.env.CLOUDINARY_SECRET 
});

class ImageService {
    async convertBufferToDataUrl(fileBuffer) {
        return `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
    }

    async uploadImage(fileBuffer) {
        try {
            const dataUrl = await this.convertBufferToDataUrl(fileBuffer);
            const result = await cloudinary.uploader.upload(dataUrl);
            return result.secure_url;
        } catch (error) {
            throw new ApiError('Error uploading image to Cloudinary', 500);
        }
    }
}

module.exports = new ImageService();
