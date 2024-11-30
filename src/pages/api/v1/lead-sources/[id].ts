
import { NextApiRequest, NextApiResponse } from 'next';
import { responseHandler } from '@/backend/utils/responseHandler';
import { leadSourceController } from '@/backend/controllers/leadSourceController';
import { isAuthenticated } from '@/backend/middlewares/auth';
import dbConnect from '@/backend/db/config/mongoose';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    await dbConnect();
  // Apply authentication middleware
  await new Promise((resolve:any) => {
    isAuthenticated()(req, res, resolve);
  });
    if (!['PUT', 'DELETE'].includes(req.method!)) {
      return responseHandler.error(res, '', 'Method not allowed', 405);
    }
    try {
      const { user } = req;
      switch (req.method) {
        case 'PUT':
          const updatedSource = await leadSourceController.update(
            id as string,
            req.body,
            user._id
          );
          return responseHandler.success(res, updatedSource, 'Lead source updated successfully',200);
  
        case 'DELETE':
          const data=await leadSourceController.delete(id as string, user._id);
          return responseHandler.success(res, data, 'Lead source deleted successfully',200);
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