import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/backend/db/config/mongoose';
import { validateResetPassword } from '@/backend/validations/forgetPassword';
import { responseHandler } from '@/backend/utils/responseHandler';
import { forgetPasswordController } from '@/backend/controllers/forgetPassword';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return responseHandler.error(res, '', 'Method not allowed', 405);
  }

  await dbConnect();

  try {
    const { error } = validateResetPassword(req.body);
    if (error) {
      return responseHandler.error(
        res,
        '',
        error.details[0].message,
        400
      );
    }

    await forgetPasswordController.resetPassword(req.body);

    return responseHandler.success(
      res,
      "",
      'Password reset successfully!',
      200
    );
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';
    const statusCode = 
      errorMessage.includes('No user found') ? 404 :
      errorMessage.includes('Invalid session') ? 401 :
      error.statusCode || 500;

    return responseHandler.error(res, '', errorMessage, statusCode);
  }
}