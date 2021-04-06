import express from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

import multer from 'multer';
import multerConfig from './config/multer';
import AppointmentController from './app/controllers/AppointmentController';

const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/', async (req, res) => {
	res.json({ message: 'Hello World' });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/appointments', AppointmentController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
