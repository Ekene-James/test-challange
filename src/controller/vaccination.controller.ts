import { Request, Response } from "express";
import { CreateVaccinationtInput } from "../schema/vaccine.schema";
import {
  createVaccination,
  findVaccinations,
} from "../services/vaccination.service";

export const createVaccinationHandler = async (
  req: Request<{}, {}, CreateVaccinationtInput["body"]>,
  res: Response
) => {
  const body = req.body;
  const vaccination = await createVaccination(body);

  return res.status(200).json({
    summary: vaccination,
  });
};

export async function getVaccinationsHandler(req: Request, res: Response) {
  const vaccinationSummary = await findVaccinations(req.query);
  return res.status(200).json({
    summary: vaccinationSummary,
  });
}
