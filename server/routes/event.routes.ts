import { Router } from 'express';
import { EventController } from '../controllers/event.controller';

class EventRoutes extends EventController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes = () => {
    this.router.post('/', this.addEventControllerAsync);
  };
}
export default new EventRoutes();
