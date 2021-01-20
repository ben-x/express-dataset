import { BuildOptions, Model } from 'sequelize';
import { IActorDTO } from './IActor.repo';
import { IRepoDTO } from './IRepo.repo';

export interface IEvent {
  id: number;
  type: string;
  repo_id: number;
  actor_id: number;
  created_at: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventDTO {
  id: number;
  type: string;
  actor: IActorDTO;
  repo: IRepoDTO;
  created_at: string;
}

export interface IEventModel extends Model<IEvent>, IEvent {
  associate: (model: any) => void;
}

export type IEventRepository = typeof Model &
  IEventModel & {
    new (values?: object, options?: BuildOptions): IEventModel;
  };
