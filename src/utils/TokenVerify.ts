import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  _id?: string;
  role?: string;
  companyId?: string;
  iat: number;
  exp: number;
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded = jwtDecode<TokenPayload>(token);

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return false;
    }

    // Validate required fields exist
    if (!decoded._id || !decoded.role || !decoded.companyId) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
