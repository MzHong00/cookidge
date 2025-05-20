import { Router } from "express";

import ai from "./ai";
import user from "./user";
import auth from "./auth";
import recipe from "./recipe";
import comment from "./comment";
import ingredient from "./ingredient";
import refrigerator from "./refrigerator";
import googleOAuth from "./oauth/googleOAuth";

export default () => {
  const app = Router();

  ai(app);

  auth(app);
  googleOAuth(app);

  user(app);
  refrigerator(app);
  recipe(app);
  comment(app);
  ingredient(app);

  return app;
};
