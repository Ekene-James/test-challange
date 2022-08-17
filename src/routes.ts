import { Express, Request, Response } from "express";

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
}

export default routes;
