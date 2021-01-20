import { Request, Response } from 'express';
import ActorServices from '../services/actor.service';

/**
 * @class ActorController
 */
export class ActorController extends ActorServices {
  /**
   * @author Akinlua
   * @method addEventControllerAsync
   * @desc Feature add event
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected getActorControllerAsync = async (_: Request, res: Response): Promise<any> => {
    const data = await this.getActorServiceAsync();
    return res.status(data.statusCode).json(data.data);
  };
  /**
   * @author Akinlua
   * @method getActorByStreakControllerAsync
   * @desc Feature get actor by streak
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected getActorByStreakControllerAsync = async (_: Request, res: Response): Promise<any> => {
    const data = await this.getActorServiceAsync();
    return res.status(data.statusCode).json(data.data);
  };
  /**
   * @author Akinlua
   * @method upatedActorControllerAsync
   * @desc Feature add update actor
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected upatedActorControllerAsync = async (req: Request, res: Response): Promise<any> => {
    const data = await this.updateActorServiceAsync(req.body);
    return res.status(data.statusCode).json(data.data);
  };
}
