import jwt from 'jsonwebtoken';
import auth from '../../config/auth';
import User from '../models/User';
import * as Yup from 'yup';

const HASH = auth.secret;
const EXPIRESIN = auth.expiresIn;

class SessionController {
	async store(req, res) {
		const schema = Yup.object().shape({
			email: Yup.string().email().required(),
			password: Yup.string().required(),
		});
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}

		if (!(await user.checkPassword(password))) {
			return res.status(401).json({ error: 'Password does not match' });
		}

		const { id, name } = user;

		return res.json({
			user: {
				id,
				name,
				email,
			},
			token: jwt.sign({ id }, HASH, {
				expiresIn: '7d',
			}),
		});
	}
}

export default new SessionController();
