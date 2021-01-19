import { EnvManager } from './env.config.manager';

export class SequelizeOrmManager extends EnvManager {
  constructor() {
    super(process.env);
  }

  public getSequelizeConfig() {
    const config = {
      host: this.getEnvValue('DB_HOST'),
      port: parseInt(this.getEnvValue('DB_PORT')),
      username: this.getEnvValue('DB_USERNAME'),
      password: this.getEnvValue('DB_PASSWORD'),
      database: this.getEnvValue('DB_DATABASE'),
      dialect: this.getEnvValue('DB_DIALECT'),
      logging: false,
    };

    const prod_config = Object.create(config);
    prod_config.host = this.getEnvValue('PROD_DB_HOST');
    prod_config.username = this.getEnvValue('PROD_DB_USERNAME');
    prod_config.password = this.getEnvValue('PROD_DB_PASSWORD');
    prod_config.database = this.getEnvValue('PROD_DB_DATABASE');

    return {
      development: { ...config, ssl: false },
      production: { ...config, ...prod_config, ssl: true },
    };
  }
}

export const sequelizeOrmManager = new SequelizeOrmManager();
