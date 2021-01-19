import { Request, Response, NextFunction } from 'express';
import { BaseResponse, makeResponse } from '../contracts/baseResponse';
import { Schema } from '../lib/validation/schema';
import { HttpStatusCode } from '../constants/constants';

/**
 * @author DanielAdek
 * @method useValidatorPipe
 * @desc Feature will verify staff permission
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} Json data
 */
export const useValidatorPipe = (formType: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<BaseResponse<null> | any> => {
    try {
      const value = await Schema[formType].validateAsync(req.body);
      req.body = value;
      next();
    } catch (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json(makeResponse(null, HttpStatusCode.BAD_REQUEST, error.message));
    }
  };
};
