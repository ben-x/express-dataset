import { DataTypes, Sequelize } from 'sequelize';
import { IEventModel, IEventRepository } from '../../repositories/IEvent.repo';

export default (sequelize: Sequelize): IEventRepository => {
  const Event = <IEventRepository>sequelize.define(
    'Event',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      repo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
  Event.associate = function (_: IEventModel | any) {};
  return Event;
};
