import type { NextApiRequest, NextApiResponse } from 'next';
import { locationService } from '@/backend/utils/locationService';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
      }
  
      const { countryCode } = req.query;
      const states = locationService.getStatesByCountry(countryCode as string);
      
      return res.status(200).json({
        success: true,
        data: states.map(state => ({
          name: state.name,
          code: state.isoCode,
          countryCode: state.countryCode
        }))
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }