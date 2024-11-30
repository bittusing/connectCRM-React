import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/backend/db/config/mongoose';
import { isAuthenticated } from '@/backend/middlewares/auth';
import { responseHandler } from '@/backend/utils/responseHandler';
import { leadController } from '@/backend/controllers/leadController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // Apply authentication middleware
  await new Promise((resolve: any) => {
    isAuthenticated()(req, res, resolve);
  });

  if (!req.user) {
    return responseHandler.error(res, '', 'Authentication failed', 401);
  }

  try {
    const { user } = req;
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return responseHandler.error(res, '', 'Invalid lead ID', 400);
    }

    switch (req.method) {
      case 'GET':
        const leadDetail = await leadController.getLeadDetailById(id, user.companyId);
        return responseHandler.success(
          res,
          leadDetail,
          'Lead details retrieved successfully',
          200
        );

      default:
        return responseHandler.error(
          res,
          '',
          'Method not allowed',
          405
        );
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