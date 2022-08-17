import { object, number, string, TypeOf, nativeEnum } from "zod";
import { TargetGroupType, VaccineType } from "../models/vaccination.model";

const regex = /^\d{4}-[W](0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-3])$/;

const payload = {
  body: object({
    YearWeekISO: string({
      required_error: "Year Week ISO is required",
    }).regex(regex, "Invalid Year Week format"),
    FirstDose: number({
      required_error: "First dose is required",
    }),
    FirstDoseRefused: string({
      required_error: "First dose refused is required",
    }),
    SecondDose: number({
      required_error: "second dose is required",
    }),
    DoseAdditional1: number({
      required_error: "Dose additional 1 is required",
    }),
    DoseAdditional2: number({
      required_error: "Dose additional 2 is required",
    }),
    UnknownDose: number({
      required_error: "Unknown Dose is required",
    }),
    NumberDosesReceived: number({
      required_error: "Number of Doses received is required",
    }),
    NumberDosesExported: number({
      required_error: "Number of Doses exported is required",
    }),
    Region: string({
      required_error: "Region is required",
    }),
    Population: string({
      required_error: "Population is required",
    }),
    ReportingCountry: string({
      required_error: "Reporting country is required",
    }).max(2, "Reporting country should not be more than 2 characters long"),
    TargetGroup: nativeEnum(TargetGroupType, {
      invalid_type_error: "Option is not a valid type for target group",
    }),
    Vaccine: nativeEnum(VaccineType, {
      invalid_type_error: "Option is not a valid type for Vaccine",
    }),
    Denominator: number({
      required_error: "Denominator is required",
    }),
  }),
};

const params = {
  params: object({
    vaccinationId: string({
      required_error: "vaccination id is required",
    }),
  }),
};

export const createVaccinationSchema = object({
  ...payload,
});

// type TargetGroupEnum = infer<typeof createVaccinationSchema>;

export const updateVaccinationSchema = object({
  ...payload,
  ...params,
});

export const deleteVaccinationSchema = object({
  ...params,
});

export const getVaccinationSchema = object({
  ...params,
});

export type CreateVaccinationtInput = TypeOf<typeof createVaccinationSchema>;
export type UpdateVaccinationInput = TypeOf<typeof updateVaccinationSchema>;
export type ReadVaccinationInput = TypeOf<typeof getVaccinationSchema>;
export type DeleteVaccinationInput = TypeOf<typeof deleteVaccinationSchema>;
