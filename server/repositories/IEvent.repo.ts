import { BuildOptions, Model } from 'sequelize';

export interface IEvent {
  id: number;
  actorId: number;
  repoId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEventModel extends Model<IEvent>, IEvent {
  associate: (model: any) => void;
}

export type IEventRepository = typeof Model &
  IEventModel & {
    new (values?: object, options?: BuildOptions): IEventModel;
  };
