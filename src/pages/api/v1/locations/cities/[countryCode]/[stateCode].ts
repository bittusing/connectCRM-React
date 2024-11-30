import type { NextApiRequest, NextApiResponse } from 'next';
import { locationService } from '@/backend/utils/locationService';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
      }
  
      const { countryCode, stateCode } = req.query;
      const cities = locationService.getCitiesByState(
        countryCode as string,
        stateCode as string
      );
      
      return res.status(200).json({
        success: true,
        data: cities.map(city => ({
          name: city.name,
          stateCode: city.stateCode,
          countryCode: city.countryCode
        }))
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }