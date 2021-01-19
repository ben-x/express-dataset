import { BuildOptions, Model } from 'sequelize';

export interface IRepo {
  id: number;
  login: string;
  avatar_url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRepoDTO {
  id: number;
  login: string;
  avatar_url: string;
}

export interface IRepoModel extends Model<IRepo>, IRepo {
  associate: (model: any) => void;
}

export type IRepoRepository = typeof Model &
  IRepoModel & {
    new (values?: object, options?: BuildOptions): IRepoModel;
  };
