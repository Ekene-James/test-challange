import mongoose from "mongoose";

export interface VaccinationInput {
  YearWeekISO: string;
  FirstDose: number;
  FirstDoseRefused: string;
  SecondDose: number;
  DoseAdditional1: number;
  DoseAdditional2: number;
  UnknownDose: number;
  NumberDosesReceived: number;
  NumberDosesExported: number;
  Region: string;
  Population: string;
  ReportingCountry: string;
  TargetGroup: string;
  Vaccine: string;
  Denominator: number;
}

export interface VaccinationDocument
  extends VaccinationInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

export enum TargetGroupType {
  ALL = "ALL",
  AgeLD18 = "Age<18",
  HCW = "HCW",
  LTCF = "LTCF",
  Age0_4 = "Age0_4",
  Age5_9 = "Age5_9",
  Age10_14 = "Age10_14",
  Age15_17 = "Age15_17",
  Age18_24 = "Age18_24",
  Age25_49 = "Age25_49",
  Age50_59 = "Age50_59",
  Age60_69 = "Age60_69",
  Age70_79 = "Age70_79",
  Age80Plus = "Age80+",
  AgeUnk = "AgeUnk",
  AdultsAge60Plus = "1_Age60+",
}
export enum VaccineType {
  AZ = "AZ",
  BECNBG = "BECNBG",
  BHACOV = "BHACOV",
  CHU = "CHU",
  COM = "COM",
  CVAC = "CVAC",
  JANSS = "JANSS",
  HAYATVAC = "HAYATVAC",
  MOD = "MOD",
  NVX = "NVX",
  NVXD = "NVXD",
  QAZVAQ = "QAZVAQ",
  SGSK = "Age70_79",
  SIICOV = "SIICOV",
  SIN = "SIN",
  SPU = "SPU",
  SPUL = "SPUL",
  SRCVB = "SRCVB",
  WUCNBG = "WUCNBG",
  CNBG = "CNBG",
  UNK = "UNK",
  ZFUZ = "ZFUZ",
  VAC = "VAC",
}

const vaccinationSchema = new mongoose.Schema(
  {
    YearWeekISO: { type: String, required: true },
    FirstDose: { type: Number, required: true },
    FirstDoseRefused: { type: String, required: true },
    SecondDose: { type: Number, required: true },
    DoseAdditional1: { type: Number, required: true },
    DoseAdditional2: { type: Number, required: true },
    UnknownDose: { type: Number, required: true },
    NumberDosesReceived: { type: Number, required: true },
    NumberDosesExported: { type: Number, required: true },
    Region: { type: String, required: true },
    Population: { type: String, required: true },
    ReportingCountry: { type: String, required: true },
    TargetGroup: {
      type: String,
      default: TargetGroupType.ALL,
      enum: Object.values(TargetGroupType),
    },
    Vaccine: {
      type: String,
      default: VaccineType.AZ,
      enum: Object.values(VaccineType),
    },
    Denominator: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const VaccinationModel = mongoose.model<VaccinationDocument>(
  "Vaccination",
  vaccinationSchema
);

export default VaccinationModel;
