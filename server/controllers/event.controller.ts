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
  protected addEventControllerAsync = async (req: Request, res: Response): Promise<any> => {
    const data = await this.addEventServiceAsync(req.body);
    return res.status(data.statusCode).json(data.data);
  };
  /**
   * @author Akinlua
   * @method getAllEventControllerAsync
   * @desc Feature add event
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected getAllEventControllerAsync = async (_: Request, res: Response): Promise<any> => {
    const data = await this.getAllEventServiceAsync();
    return res.status(data.statusCode).json(data.data);
  };
  /**
   * @author Akinlua
   * @method getAllEventControllerAsync
   * @desc Feature add event
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected getEventByActorControllerAsync = async (req: Request, res: Response): Promise<any> => {
    const data = await this.getEventByActorServiceAsync(req.params.actorId);
    return res.status(data.statusCode).json(data.data);
  };
}
