
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/backend/db/config/mongoose';
import { isAuthenticated } from '@/backend/middlewares/auth';
import { validateForUpdateLead } from '@/backend/validations/lead';
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

    switch (req.method) {
      case 'PUT':
      case 'PATCH':
        const { error } = validateForUpdateLead(req.body);
        if (error) {
          throw {
            code: 400,
            message: error.details[0].message
          };
        }

     const data = await leadController.updateLeadByCompany(
          id as string,
          req.body,
          user._id,
          user.companyId
        );
     // const data={...updatedLead,leadHistoryController};
        return responseHandler.success(
          res,
          data,
          'Lead updated successfully',
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