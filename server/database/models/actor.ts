import { DataTypes, Sequelize } from 'sequelize';
import { IActorRepository, IActorModel } from 'server/repositories/IActor.repo';

export default (sequelize: Sequelize): IActorRepository => {
  const Actor = <IActorRepository>sequelize.define(
    'Actor',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar_url: {
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
  Actor.associate = function (models: IActorModel | any) {
    Actor.hasMany(models.Event, {
      foreignKey: 'actor_id',
      as: 'actor',
    });
  };
  return Actor;
};
