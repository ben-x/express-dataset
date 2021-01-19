import { Router } from 'express';
import ActorRoutes from './actor.routes';
import EventRoutes from './event.routes';

class Routes {
  public readonly router: Router;

  constructor() {
    this.router = Router();
    this.applicationRoutes();
  }

  private applicationRoutes = (): void => {
    this.router.use('/actors', ActorRoutes.router);
    this.router.use('/events', EventRoutes.router);
  };
}

export default new Routes();
