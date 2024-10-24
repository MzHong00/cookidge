import { Router } from 'express';

import auth from './auth';
import googleOAuth from './oauth/googleOAuth'

export default () => {
	const app = Router();
	
	auth(app);
	googleOAuth(app);

	return app;
}
