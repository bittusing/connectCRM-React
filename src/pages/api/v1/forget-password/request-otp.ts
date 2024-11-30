import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/backend/db/config/mongoose';
import { validateEmail } from '@/backend/validations/forgetPassword';
import { rateLimiter } from '@/backend/middlewares/rateLimiter';
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
    // await rateLimiter(req, res);

    // Validate email
    const { error } = validateEmail(req.body);
    if (error) {
      return responseHandler.error(
        res,
        '',
        error.details[0].message,
        400
      );
    }

    // Generate and send OTP
    const { email, otp } = await forgetPasswordController.requestOTP(req.body.email);

    return responseHandler.success(
      res,
      { email,otp },
      'OTP sent successfully to your email',
      200
    );
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';
    const statusCode = 
      errorMessage.includes('No user found') ? 404 :
      errorMessage.includes('inactive') ? 403 :
      error.statusCode || 500;

    return responseHandler.error(res, '', errorMessage, statusCode);
  }
}