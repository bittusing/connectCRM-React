import { NextApiRequest, NextApiResponse } from 'next';
import { responseHandler } from '@/backend/utils/responseHandler';
import { leadStatusController } from '@/backend/controllers/leadStatusController';
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
        const updatedSource = await leadStatusController.update(
          id as string,
          {
            ...req.body,
          },
          user._id,user.companyId
        );
        return responseHandler.success(res, updatedSource, 'Lead source updated successfully', 200);

      case 'DELETE':
        const data=await leadStatusController.delete(id as string, user._id);
        return responseHandler.success(res, data, 'Lead source status updated successfully', 200);

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
