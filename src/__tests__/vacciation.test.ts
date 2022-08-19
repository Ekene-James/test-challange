import mongoose from "mongoose";
import createServer from "../utils/server";
import supertest from "supertest";
import * as VaccinationService from "../services/vaccination.service";

const app = createServer();

const mongoId = new mongoose.Types.ObjectId().toString();
const payload = {
  _id: mongoId,
  YearWeekISO: "2021-W35",
  FirstDose: 2,
  FirstDoseRefused: "",
  SecondDose: 0,
  DoseAdditional1: 0,
  DoseAdditional2: 0,
  UnknownDose: 0,
  NumberDosesReceived: 0,
  NumberDosesExported: 0,
  Region: "CY",
  Population: "896007",
  ReportingCountry: "CY",
  TargetGroup: "Age80+",
  Vaccine: "JANSS",
  Denominator: 34568,
  createdAt: new Date("2021-09-30T13:31:07.674Z"),
  updatedAt: new Date("2021-09-30T13:31:07.674Z"),
  __v: 0,
};

const userInput = {
  YearWeekISO: "2021-W35",
  FirstDose: 2,
  FirstDoseRefused: "",
  SecondDose: 0,
  DoseAdditional1: 0,
  DoseAdditional2: 0,
  UnknownDose: 0,
  NumberDosesReceived: 0,
  NumberDosesExported: 0,
  Region: "CY",
  Population: "896007",
  ReportingCountry: "CY",
  TargetGroup: "Age80+",
  Vaccine: "JANSS",
  Denominator: 34568,
};

describe("vaccination", () => {
  describe("health check", () => {
    it("should return a 200 status", async () => {
      const { statusCode } = await supertest(createServer()).get(
        "/health-check"
      );
      expect(statusCode).toBe(200);
    });
  });

  describe("create vaccination summary", () => {
    describe("given the input fields are valid", () => {
      it("should return the summary payload", async () => {
        const createVaccinationServiceMock = jest
          .spyOn(VaccinationService, "createVaccination")
          // @ts-ignore
          .mockReturnValueOnce(JSON.stringify(payload));

        const { statusCode, body } = await supertest(app)
          .post("/api/create-vaccination")
          .send(userInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual(JSON.stringify(payload));

        expect(createVaccinationServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the vaccination service throws", () => {
      it("should return a 409 error", async () => {
        const createVaccinationServiceMock = jest
          .spyOn(VaccinationService, "createVaccination")
          .mockRejectedValueOnce("Oh no! :(");

        const { statusCode } = await supertest(createServer())
          .post("/api/create-vaccination")
          .send(userInput);

        expect(statusCode).toBe(409);

        expect(createVaccinationServiceMock).toHaveBeenCalled();
      });
    });
  });
});
