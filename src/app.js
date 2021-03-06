import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import 'express-async-errors';

import routes from './routes';
import './database';

class App {
	constructor() {
		//-- process.env.
		this.server = express();
		this.middlewares();
		this.routes();
		this.exceptionHandler();
	}

	middlewares() {
		this.server.use(express.json());
		this.server.use(
			'/files',
			express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
		);
	}

	routes() {
		this.server.use(routes);
	}

	exceptionHandler() {
		this.server.use(async (err, req, res, next) => {
			const errors = await new Youch(err, req).toJSON();
			console.log(errors);
			return res.status(500).json(errors);
		});
	}
}
export default new App().server;
