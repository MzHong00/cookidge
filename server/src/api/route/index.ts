import { Router } from 'express';

import me from './user';
import auth from './auth';
import googleOAuth from './oauth/googleOAuth'
import refrigerator from './refrigerator';

export default () => {
	const app = Router();
	
	auth(app);
	googleOAuth(app);

	me(app);
	refrigerator(app)

	return app;
}
