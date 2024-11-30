import type { NextApiRequest, NextApiResponse } from 'next';
import { locationService } from '@/backend/utils/locationService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const countries = locationService.getAllCountries();
    
    return res.status(200).json({
      success: true,
      data: countries.map(country => ({
        name: country.name,
        code: country.isoCode,
        phoneCode: country.phonecode,
        flag: country.flag
      }))
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
}