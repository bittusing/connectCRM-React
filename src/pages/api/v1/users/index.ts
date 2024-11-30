// import { NextApiRequest, NextApiResponse } from 'next';
// import { responseHandler } from '@/backend/utils/responseHandler';
// import { getUserList } from '@/backend/controllers/userController';
// import { isAuthenticated } from '@/backend/middlewares/auth';
// import dbConnect from '@/backend/db/config/mongoose';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   // Apply authentication middleware
//   await new Promise((resolve:any) => {
//     isAuthenticated()(req, res, resolve);
//   });

//   if (!req.user) {
//     return responseHandler.error(res, '', 'Authentication failed', 401);
//   }

//   try {
//     const { user } = req;

//     switch (req.method) {
//       case 'GET':
//         const sources = await getUserList(user.companyId,user.role,page: number = 1,
//           limit: number = 10,
//           search?: string);
//         return responseHandler.success(res, sources, 'Users retrieved successfully', 200);

    
//       default:
//         return responseHandler.error(res, '', 'Method not allowed', 405);
//     }
//   } catch (error: any) {
//     return responseHandler.error(
//       res,
//       '',
//       error.message || 'Internal server error',
//       error.code || 500
//     );
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { responseHandler } from '@/backend/utils/responseHandler';
import { getUserList } from '@/backend/controllers/userController';
import { isAuthenticated } from '@/backend/middlewares/auth';
import dbConnect from '@/backend/db/config/mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    // Apply authentication middleware
    await new Promise((resolve: any) => {
      isAuthenticated()(req, res, resolve);
    });

    if (!req.user) {
      return responseHandler.error(res, '', 'Authentication failed', 401);
    }

    const { user } = req;

    switch (req.method) {
      case 'GET':
        // Extract pagination and search parameters from query
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = req.query.search as string | undefined;

        // Validate pagination parameters
        if (page < 1 || limit < 1 || limit > 100) {
          return responseHandler.error(
            res,
            '',
            'Invalid pagination parameters. Page must be >= 1 and limit between 1 and 100',
            400
          );
        }

        const users = await getUserList(
          user.companyId,
          user.role,
          page,
          limit,
          search
        );

        return responseHandler.success(
          res, 
          users, 
          'Users retrieved successfully', 
          200
        );

      default:
        return responseHandler.error(res, '', 'Method not allowed', 405);
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return responseHandler.error(
      res,
      '',
      error.message || 'Internal server error',
      error.code || 500
    );
  }
}