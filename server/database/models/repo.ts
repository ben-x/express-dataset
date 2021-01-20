import { DataTypes, Sequelize } from 'sequelize';
import { IRepoRepository, IRepoModel } from '../../repositories/IRepo.repo';

export default (sequelize: Sequelize): IRepoRepository => {
  const Repo = <IRepoRepository>sequelize.define(
    'Repo',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
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
    Repo.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'repo',
      onDelete: 'CASCADE',
    });
  };
  return Repo;
};
