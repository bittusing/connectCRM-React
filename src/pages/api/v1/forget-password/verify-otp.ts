import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/backend/db/config/mongoose';
import { validateOTP } from '@/backend/validations/forgetPassword';
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
    const { error } = validateOTP(req.body);
    if (error) {
      return responseHandler.error(
        res,
        '',
        error.details[0].message,
        400
      );
    }

    const result = await forgetPasswordController.verifyOTP(req.body);

    return responseHandler.success(
      res,
      { email: result.email },
      'OTP verified successfully',
      200
    );
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';
    const statusCode = 
      errorMessage.includes('Invalid OTP') ? 400 :
      errorMessage.includes('OTP expired') ? 400 :
      error.statusCode || 500;

    return responseHandler.error(res, '', errorMessage, statusCode);
  }
}
