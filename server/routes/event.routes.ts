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
    this.router.get('/', this.getAllEventControllerAsync);
  };
}
export default new EventRoutes();
