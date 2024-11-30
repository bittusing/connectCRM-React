import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/backend/db/config/mongoose';
import { validateSignin } from '@/backend/validations/signin';
import { rateLimiter } from '@/backend/middlewares/rateLimiter';
import { responseHandler } from '@/backend/utils/responseHandler';
import { signinControllers } from '@/backend/controllers';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return responseHandler.error(res, '', 'Method not allowed', 405);
  }

  await dbConnect();

  try {
    // Apply rate limiter
    await rateLimiter(req, res);

    // Validate request body
    const { error } = validateSignin(req.body);
    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return responseHandler.error(
        res, 
        errorMessages, 
        'Validation error', 
        400
      );
    }

    // Check if we have the required credentials
    if (!req.body.password && !req.body.otp) {
      return responseHandler.error(
        res,
        '',
        'Please provide either password or OTP',
        400
      );
    }

    // Authenticate user
    const { user, token, refreshToken } = 
      await signinControllers.authenticateUser(req.body);

    // Prepare response data
    const responseData = {
      user,
      token: token.token,
      refreshToken: refreshToken.token,
    };

    return responseHandler.success(
      res, 
      responseData, 
      'User signed in successfully!', 
      200
    );

  } catch (error: any) {
    // Handle specific errors
    const errorMessage = error.message || 'Internal server error';
    const statusCode = 
      errorMessage.includes('No user found') ? 404 :
      errorMessage.includes('Invalid credentials') ? 401 :
      errorMessage.includes('inactive') ? 403 :
      errorMessage.includes('expired') ? 401 :
      error.statusCode || 500;

    return responseHandler.error(res, '', errorMessage, statusCode);
  }
}