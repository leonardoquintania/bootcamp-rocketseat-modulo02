import express from 'express';
import UserController from './app/controllers/UserController';

const routes = express.Router();

routes.get('/', async (req, res) => {
	res.json({ message: 'Hello World' });
});

routes.post('/users', UserController.store);

export default routes;
