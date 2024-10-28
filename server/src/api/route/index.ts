import { Router } from 'express';

import auth from './auth';
import googleOAuth from './oauth/googleOAuth'
import me from './user';

export default () => {
	const app = Router();
	
	auth(app);
	googleOAuth(app);
	me(app);
	
	return app;
}
