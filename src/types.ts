import type { Request, Response, NextFunction } from 'express';
import { Status } from 'app/configs/types';

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | JSONValue[]

export type Controller<Res = APIResponse> = (req: Request, res: Response<Res>) => any

export interface APIResponse extends Status {
  data: any
}

export type Middleware = (req: Request, res: Response, next: NextFunction) => any