/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Express, Request, Response } from "express";
import {
  createVaccinationHandler,
  getVaccinationsHandler,
} from "./controller/vaccination.controller";

import validate from "./middleware/validate";

import { createVaccinationSchema } from "./schema/vaccine.schema";

function routes(app: Express) {
  /***
   * @openapi
   * /health-check
   *  get:
   *      desc: responds if the app is up and running
   *      response:
   *          200:
   *              desc: App is running
   *
   */
  app.get("/health-check", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  /***
   * @openapi
   * /api/vaccination
   *  post:
   *      desc: creates vaccination
   *      response:
   *          200:
   *              desc:
   *
   */
  app.post(
    "/api/create-vaccination",
    validate(createVaccinationSchema),
    // @ts-ignore
    createVaccinationHandler
  );

  app.get("/api/vaccine-summary", getVaccinationsHandler);
}

export default routes;
