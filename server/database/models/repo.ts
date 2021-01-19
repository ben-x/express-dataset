import { DataTypes, Sequelize } from 'sequelize';
import { IRepoRepository, IRepoModel } from 'server/repositories/IRepo.repo';

export default (sequelize: Sequelize): IRepoRepository => {
  const Repo = <IRepoRepository>sequelize.define(
    'Repo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {},
  );
  Repo.associate = function (models: IRepoModel | any) {
    Repo.hasMany(models.Event, {
      foreignKey: 'repo_id',
      as: 'repo',
    });
  };
  return Repo;
};
