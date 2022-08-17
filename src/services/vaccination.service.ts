import VaccinationModel, {
  VaccinationDocument,
  VaccinationInput,
} from "../models/vaccination.model";
import logger from "../utils/logger";
import { FilterQuery, QueryOptions } from "mongoose";

export async function createVaccination(input: VaccinationInput) {
  try {
    const result = await VaccinationModel.create(input);

    return result;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

export async function findVaccinations(
  query: FilterQuery<VaccinationDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const result = await VaccinationModel.find(query, {}, options);

    return result;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}
