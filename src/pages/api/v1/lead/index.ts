import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/backend/db/config/mongoose';
import { isAuthenticated } from '@/backend/middlewares/auth';
import { validateLead } from '@/backend/validations/lead';
import { responseHandler } from '@/backend/utils/responseHandler';
import {leadController} from '@/backend/controllers/leadController';
import { any } from 'joi';

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
    switch (req.method) {
        case 'POST':
        const { error } = validateLead(req.body);
        if (error) {
          throw {
            code: 400,
            message: error.details[0].message
          };
        }
        const newLead = await leadController.createLeadByCompany(
          {
            ...req.body,
          },
          user._id,
          user.companyId
        );
        return responseHandler.success(
          res, 
          newLead, 
          'Lead created successfully', 
          200
        );
  //// # Get All Lead Api
        case 'GET':
        try {
         const { page = 1, limit = 10 } = req.query;
         const leads = await leadController.getAllLeadByCompany(
          // @ts-ignore
            req,
            res
            );
            return leads; 
            } catch (error) {
               return responseHandler.error(
                res, 
                error, 
                'Sone Thing wrong', 
                500
              );
              }

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
