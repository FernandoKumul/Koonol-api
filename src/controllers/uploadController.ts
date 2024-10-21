import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from 'cloudinary';
import { ApiResponse } from '../utils/ApiResponse';
import { Request, Response } from 'express';
import { object } from 'zod';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


export default class UploadController {
  static async uploadImage(req: Request, res: Response) {
    const fileBuffer = req.file?.buffer;
    const isAvatar = req.query.avatar === 'true';

    if (!fileBuffer) {
      res.status(400).json(ApiResponse.errorResponse("No se ha enviado una imagen", 400));
      return
    }

    let options: UploadApiOptions = {}

    if (isAvatar) {
      options = {
        folder: 'avatars',
        transformation: {
          width: 256, height: 256, gravity: 'face', crop: 'fill'
        }
      }
    }

    try {
      const response: UploadApiResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(options, (err, result) => {
          if (err) {
            reject(err)
          }

          if (result) {
            resolve(result);
          } else {
            reject(new Error('No result received from Cloudinary'));
          }
        }).end(fileBuffer)
      })

      res.status(200).json(ApiResponse.successResponse("Imagen subida con éxito", { url: response.secure_url }));
    } catch (error) {
      console.log(error);
      const errorMessage = error instanceof Error ? error.message : (error as any).message || "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }


  }
}