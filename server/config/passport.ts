import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import { UserModel } from '../model';
import { UserDTO } from '../../shared/dto';

const passportConfig = () => {
	passport.serializeUser((user: UserDTO.RESPONSE_LOGIN, done: Function) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id: number, done: Function) => {
		try {
			const user = await UserModel.findById(id);
			done(null, user);
		} catch (err) {
			console.error(err);
		}
	});

	passport.use(
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
				session: true,
				passReqToCallback: false,
			},
			async (username: string, password: string, done: Function) => {
				try {
					const user = await UserModel.findByUsername(username);
					if (!user)
						return done(null, false, {
							message: '존재하지 않는 아이디입니다.',
						});
					if (password !== user.password)
						return done(null, false, {
							message: '비밀번호가 틀렸습니다.',
						});
					return done(null, user);
				} catch (err) {
					return done(err);
				}
			},
		),
	);
};

export default passportConfig;
