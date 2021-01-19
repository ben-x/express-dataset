import { Request, Response } from 'express';
import EventServices from '../services/event.service';

/**
 * @class EventController
 */
export class EventController extends EventServices {
  /**
   * @author Akinlua
   * @method addEventControllerAsync
   * @desc Feature add event
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected addEventControllerAsync = async (_: Request, res: Response): Promise<any> => {
    const data = await this.addEventServiceAsync();
    return res.status(data.statusCode).json(data);
  };
}
