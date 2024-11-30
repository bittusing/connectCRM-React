import { NextApiRequest, NextApiResponse } from 'next';
import { responseHandler } from '@/backend/utils/responseHandler';
import { isAuthenticated } from '@/backend/middlewares/auth';
import { registerUser } from '@/backend/controllers/registrationController';
import { validateUserRegistration } from '@/backend/validations/userRegistration';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return responseHandler.error(res, '', 'Method not allowed', 405);
  }

  try {
    // Apply authentication
    await new Promise((resolve:any) => {
      isAuthenticated()(req, res, resolve);
    });

    // Get authenticated user
    const authUser = req.user;
    if (!authUser) {
      return responseHandler.error(res, '', 'Authentication required', 401);
    }

    // Validate input
    const { error } = validateUserRegistration(req.body);
    if (error) {
      return responseHandler.error(res, error.details, 'Validation error', 400);
    }

   

    // Register user
    const result = await registerUser(
      authUser.companyId,
      req.body,
      authUser._id,
      
    );

    return responseHandler.success(
      res, 
      result,
      'User registered successfully',
      201
    );

  } catch (error: any) {
    let statusCode = error.code || 500;
    let message = error.message || 'Internal server error';

    // Handle specific errors
    if (error.code === 409) {
      statusCode = 409;
      message = `${error.field} already exists`;
    }

    return responseHandler.error(res, '', message, statusCode);
  }
}