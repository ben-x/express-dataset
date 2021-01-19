import { DataTypes, Sequelize } from 'sequelize';
import { IEventModel, IEventRepository } from '../../repositories/IEvent.repo';

export default (sequelize: Sequelize): IEventRepository => {
  const Event = <IEventRepository>sequelize.define(
    'Event',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
