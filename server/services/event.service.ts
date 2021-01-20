import { BaseResponse, makeResponse } from '../contracts/baseResponse';
import { HttpStatusCode } from '../constants/constants';
import { IEvent, IEventDTO, IEventRepository } from '../repositories/IEvent.repo';
import db from '../database/models';
import { IRepoRepository } from '../repositories/IRepo.repo';
import { IActorRepository } from '../repositories/IActor.repo';

const Repo: IRepoRepository = db.Repo;
const Actor: IActorRepository = db.Actor;
const Event: IEventRepository = db.Event;

/**
 * @class EventServices
 */
export default class EventServices implements Required<EventServices> {
  /**
   * @author Akinlua
   * @method addEventServiceAsync
   * @desc Feature will add new event
   * @returns {object} BaseResponse
   */
  addEventServiceAsync = async (event: IEventDTO): Promise<BaseResponse<IEventDTO | null>> => {
    try {
      const newActor = event.actor;
      const newRepo = event.repo;
      // TODO: setup db transaction
      const [existingRepo, existingActor, existingEvent] = await Promise.all([
        Repo.findByPk(newRepo.id),
        Actor.findByPk(newActor.id),
        Event.findByPk(event.id),
      ]);
      if (existingEvent) {
        return makeResponse(null, HttpStatusCode.BAD_REQUEST, 'The event already exist');
      }
      if (!existingRepo) {
        await Repo.create(newRepo);
      }
      if (!existingActor) {
        await Actor.create(newActor);
      }
      await Event.create({
        id: event.id,
        actor_id: event.actor.id,
        type: event.type,
        repo_id: event.repo.id,
        created_at: new Date(event.created_at),
      } as IEvent);
      return makeResponse(event);
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
  /**
   * @author Akinlua
   * @method getEventServiceAsync
   * @desc Feature will get event
   * @returns {object} BaseResponse
   */
  getAllEventServiceAsync = async (): Promise<BaseResponse<IEventDTO[] | null>> => {
    try {
      let events = ((await Event.findAll({
        include: [
          { model: Actor, as: 'actor' },
          { model: Repo, as: 'repo' },
        ],
        order: [['id', 'ASC']],
      })) as unknown) as IEventDTO[];
      events = events.map(
        ({ id, type, actor, repo, created_at }): IEventDTO => ({
          id,
          type,
          actor: {
            id: actor.id,
            login: actor.login,
            avatar_url: actor.avatar_url,
          },
          repo: {
            id: repo.id,
            name: repo.name,
            url: repo.url,
          },
          created_at,
        }),
      );
      return makeResponse(events);
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
}
