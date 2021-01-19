import 'dotenv/config';

export class EnvManager {

  constructor(private env: { [k: string]: string | undefined }) { }

  private expectedEnvValues(): string[] {
    const program = ['NODE_ENV', 'PORT', 'SECRET'];
    return [...program];
  }

  public getEnvValue(key: string, throwOnMissing = true): string {
    const value = this.env[key]!;
    if (!value && throwOnMissing) {
      throw new Error(`\tmissing env.${key}.\n \n\tPlease add ${key} in .env file\n`);
    }

    return value;
  }

  public getApplicationPort() {
    return parseInt(this.getEnvValue('PORT'), 10);
  }
  
  public ensureEnvValues() {
    this.expectedEnvValues().forEach(k => this.getEnvValue(k, true));
    return new EnvManager(process.env);
  }

  public isProduction() {
    const mode = this.getEnvValue('NODE_ENV', false);
    return mode != 'development';
  }
}

const envManager = new EnvManager(process.env)
  .ensureEnvValues();

export { envManager };