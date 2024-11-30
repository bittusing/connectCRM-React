import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/backend/db/config/mongoose';
import { isAuthenticated } from '@/backend/middlewares/auth';
import { validateProfileUpdate } from '@/backend/validations/profile';
import { responseHandler } from '@/backend/utils/responseHandler';
import { profileController } from '@/backend/controllers/profile';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET' && req.method !== 'PUT' && req.method !== 'PATCH') {
    return responseHandler.error(res, '', 'Method not allowed', 405);
  }

  await dbConnect();

  try {
    // Apply authentication middleware
    await new Promise((resolve: any) => {
      isAuthenticated()(req, res, resolve);
    });

    if (!req.user) {
      return responseHandler.error(res, '', 'Authentication failed', 401);
    }

    const { user } = req;

    if (req.method === 'GET') {
      // Get profile
      const profile = await profileController.getProfile(user._id);
      return responseHandler.success(
        res,
        profile,
        'Profile retrieved successfully',
        200
      );
    } else {
      // Update profile
      // Validate request body
      const { error } = validateProfileUpdate(req.body);
      if (error) {
        return responseHandler.error(
          res,
          '',
          error.details[0].message,
          400
        );
      }

      const updatedProfile = await profileController.updateProfile(
        user._id,
        req.body
      );

      return responseHandler.success(
        res,
        updatedProfile,
        'Profile updated successfully',
        200
      );
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Internal server error';
    const statusCode =
      errorMessage.includes('not found') ? 404 :
      errorMessage.includes('duplicate') ? 409 :
      error.statusCode || 500;

    return responseHandler.error(res, '', errorMessage, statusCode);
  }
}