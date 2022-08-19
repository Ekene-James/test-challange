import { Request, Response } from "express";
import { CreateVaccinationtInput } from "../schema/vaccine.schema";
import {
  createVaccination,
  findVaccinations,
} from "../services/vaccination.service";
import logger from "../utils/logger";

export const createVaccinationHandler = async (
  req: Request<CreateVaccinationtInput["body"]>,
  res: Response
) => {
  const body = req.body;
  try {
    const vaccination = await createVaccination(body);

    return res.status(200).json(vaccination);
  } catch (err: any) {
    logger.error(err);
    return res.status(409).json({
      ...err,
    });
  }
};

export async function getVaccinationsHandler(req: Request, res: Response) {
  try {
    const vaccinationSummary = await findVaccinations(req.query);
    return res.status(200).json({
      summary: vaccinationSummary,
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(409).json({
      ...err,
    });
  }
}
