import express from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';

import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/', async (req, res) => {
	res.json({ message: 'Hello World' });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
