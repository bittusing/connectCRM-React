import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/backend/db/config/mongoose';
import { validateCallHistory } from '@/backend/validations/callHistory';
import { responseHandler } from '@/backend/utils/responseHandler';
import { callHistoryController } from '@/backend/controllers/callHistoryController';
import { isAuthenticated } from '@/backend/middlewares/auth';

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    _id: string;
    companyId: string;
    [key: string]: any;
  };
}

export default async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return responseHandler.error(res, '', 'Method not allowed', 405);
  }

  await dbConnect();

  try {
    // Apply authentication middleware
    await new Promise((resolve:any) => {
      isAuthenticated()(req, res, resolve);
    });

    if (!req.user) {
      return responseHandler.error(res, '', 'Authentication failed', 401);
    }

    // Validate the array of call records
    const { error } = validateCallHistory(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return responseHandler.error(res, '', errorMessage, 400);
    }

    // Save call history
    const result = await callHistoryController.saveCallHistory(
      req.body,
      req.user._id,
      req.user.companyId
    );
    
    return responseHandler.success(
      res,
      result,
      `Successfully processed ${result.savedCount} call records`,
      200
    );

  } catch (error: any) {
    console.error('API Error:', error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    
    return responseHandler.error(res, '', message, statusCode);
  }
}

