// src/pages/api/v1/product-service/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { responseHandler } from '@/backend/utils/responseHandler';
import { productServiceController } from '@/backend/controllers/productServiceController';
import { isAuthenticated } from '@/backend/middlewares/auth';
import dbConnect from '@/backend/db/config/mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  await new Promise((resolve:any) => {
    isAuthenticated()(req, res, resolve);
  });

  if (!req.user) {
    return responseHandler.error(res, '', 'Authentication failed', 401);
  }

  try {
    const { user } = req;
    const { id } = req.query;

    switch (req.method) {
      case 'PUT':
        const updatedProduct = await productServiceController.update(
          id as string,
          {
            ...req.body,
          },
          user._id
        );
        return responseHandler.success(res, updatedProduct, 'Product/Service updated successfully', 200);

      case 'DELETE':
        const data= await productServiceController.delete(id as string, user._id);
        return responseHandler.success(res, data, 'Product/Service status updated successfully', 200);

      default:
        return responseHandler.error(res, '', 'Method not allowed', 405);
    }
  } catch (error: any) {
    return responseHandler.error(
      res,
      '',
      error.message || 'Internal server error',
      error.code || 500
    );
  }
}
