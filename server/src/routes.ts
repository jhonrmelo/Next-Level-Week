import express, { request, response } from 'express';
import PointsController from './controllers/pointsController';
import Itemscontroller from './controllers/itemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new Itemscontroller();

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index)
routes.post('/points', pointsController.create)
routes.get('/points/:id', pointsController.show)

export default routes; 