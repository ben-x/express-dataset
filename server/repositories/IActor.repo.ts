import { BuildOptions, Model } from 'sequelize';

export interface IActor {
  id: number;
  login: string;
  avatar_url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IActorModel extends Model<IActor>, IActor {
  associate: (model: any) => void;
}

export type IActorRepository = typeof Model &
  IActorModel & {
    new (values?: object, options?: BuildOptions): IActorModel;
  };
