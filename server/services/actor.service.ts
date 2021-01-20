import { BaseResponse, makeResponse } from '../contracts/baseResponse';
import { HttpStatusCode } from '../constants/constants';
import db from '../database/models';
import { IActorDTO, IActorRepository } from '../repositories/IActor.repo';
import { IEventRepository } from '../repositories/IEvent.repo';
import sequelize from 'sequelize';

const Actor: IActorRepository = db.Actor;
const Event: IEventRepository = db.Event;

/**
 * @class ActorServices
 */
export default class ActorServices implements Required<ActorServices> {
  /**
   * @author Akinlua
   * @method getActorServiceAsync
   * @desc Feature will add new actor
   * @returns {object} BaseResponse
   */
  getActorServiceAsync = async (): Promise<BaseResponse<IActorDTO[] | null>> => {
    try {
      const actors = ((await Event.findAll({
        include: [{ model: Actor, as: 'actor' }],
        attributes: ['actor_id', [sequelize.fn('COUNT', sequelize.col('actor_id')), 'total']],
        order: [
          [sequelize.literal('total'), 'DESC'],
          ['created_at', 'DESC'],
        ],
        group: ['Event.actor_id', 'actor.id', 'created_at'],
      })) as unknown) as { actor: IActorDTO }[];
      const returnValue = actors.map(
        ({ actor }): IActorDTO => ({ id: actor.id, avatar_url: actor.avatar_url, login: actor.login }),
      );
      return makeResponse(returnValue);
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
  /**
   * @author Akinlua
   * @method updateActorServiceAsync
   * @desc Feature will add new actor
   * @returns {object} BaseResponse
   */
  updateActorServiceAsync = async (update: { id: number; avatar_url: string }): Promise<BaseResponse<any>> => {
    try {
      const existingActor = await Actor.findByPk(update.id);
      if (!existingActor) {
        return makeResponse(null, HttpStatusCode.NOT_FOUND, 'The actor does not exist');
      }

      throw new Error('Method not implemented yet');
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
  /**
   * @author Akinlua
   * @method updateActorServiceAsync
   * @desc Feature will add new actor
   * @returns {object} BaseResponse
   */
  getActorByStreakServiceAsync = async (): Promise<BaseResponse<any>> => {
    try {
      throw new Error('Method not implemented yet');
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
}
