import { NextApiRequest, NextApiResponse } from 'next';
import { responseHandler } from '@/backend/utils/responseHandler';
import { leadStatusController } from '@/backend/controllers/leadStatusController';
import { isAuthenticated } from '@/backend/middlewares/auth';
import dbConnect from '@/backend/db/config/mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // Apply authentication middleware
  await new Promise((resolve:any) => {
    isAuthenticated()(req, res, resolve);
  });

  if (!req.user) {
    return responseHandler.error(res, '', 'Authentication failed', 401);
  }

  try {
    const { user } = req;

    switch (req.method) {
      case 'GET':
        const sources = await leadStatusController.getAllByCompany(user.companyId);
        return responseHandler.success(res, sources, 'Lead sources retrieved successfully', 200);

      case 'POST':
        const newSource = await leadStatusController.create({
          ...req.body,
        }, user._id,user.companyId);
        return responseHandler.success(res, newSource, 'Lead source created successfully', 201);

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