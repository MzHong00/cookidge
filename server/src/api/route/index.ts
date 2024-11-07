import { Router } from "express";

import user from "./user";
import auth from "./auth";
import recipe from "./recipe";
import ingredient from "./ingredient";
import refrigerator from "./refrigerator";
import googleOAuth from "./oauth/googleOAuth";

export default () => {
  const app = Router();

  auth(app);
  googleOAuth(app);

  user(app);
  refrigerator(app);
  recipe(app);
  ingredient(app);

  return app;
};
