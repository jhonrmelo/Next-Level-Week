import express, { request, response } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import PointsController from './controllers/pointsController';
import Itemscontroller from './controllers/itemsController';
import PointCelebrate from './Validation/CelebrateValidation';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new Itemscontroller();

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index)

routes.post('/points',
    upload.single('image'),
    PointCelebrate,
    pointsController.create)

routes.get('/points/:id', pointsController.show)

export default routes; 