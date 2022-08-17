import { Request, Response } from "express";
import { CreateVaccinationtInput } from "../schema/vaccine.schema";
import { createVaccination } from "../services/vaccination.service";
import { AddAdvResultToRes } from "../utils/addAdvResultToRes";

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

export async function getVaccinationsHandler(
  req: Request,
  res: AddAdvResultToRes
) {
  return res.status(200).json();
}
