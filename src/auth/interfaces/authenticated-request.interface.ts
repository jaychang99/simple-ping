import { Request } from 'express';

interface UserPayload {
  userId: string;
  // add other properties as needed
}

export interface AuthenticatedRequest extends Request {
  user: UserPayload;
}
