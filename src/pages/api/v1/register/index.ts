import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/backend/db/config/mongoose';
import { validateRegistration } from '@/backend/validations/registration';
import { rateLimiter } from '@/backend/middlewares/rateLimiter';
import { responseHandler } from '@/backend/utils/responseHandler';
import { registrationController } from '@/backend/controllers/registrationController';

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
    const { error } = validateRegistration(req.body);
    if (error) {
      return responseHandler.error(res, error.details, 'Validation error', 400);
    }
    // Register company and admin
    const { company, user, token, refreshToken } = 
      await registrationController.registerCompanyAndAdmin(
        req.body.company,
        req.body.user,
        // ipaddress
      );

    // Prepare response data
    const responseData = {
      company: {
        id: company._id,
        name: company.name,
        code: company.code,
        subscription: company.subscription
      },
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: token.token,
      refreshToken: refreshToken.token
    };

    return responseHandler.success(
      res,
      responseData,
      'Registration successful!',
      201
    );

  } catch (error: any) {
    return responseHandler.error(
      res, 
      '', 
      error.message || 'Internal server error',
      error.statusCode || 500
    );
  }
}