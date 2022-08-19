/* eslint-disable @typescript-eslint/ban-ts-comment */
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
const summaryPayload = {
  summary: [
    {
      NumberDosesReceived: 5,
      weekStart: "2020-W10",
      weekEnd: "2020-W15",
    },
    {
      NumberDosesReceived: 5,
      weekStart: "2020-W20",
      weekEnd: "2020-W25",
    },
    {
      NumberDosesReceived: 5,
      weekStart: "2020-W30",
      weekEnd: "2020-W35",
    },
  ],
};
const summaryPayload1 = {
  summary: [],
};
const query = {
  c: "AT",
  dateFrom: "2020-W10",
  dateTo: "2020-W50",
  range: "5",
};
const query1 = {
  c: "AT",
  dateFrom: "2017-W10",
  dateTo: "2017-W50",
  range: "5",
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

        const { statusCode } = await supertest(app)
          .post("/api/create-vaccination")
          .send(userInput);

        expect(statusCode).toBe(409);

        expect(createVaccinationServiceMock).toHaveBeenCalled();
      });
    });
  });
  describe("find vaccination summary", () => {
    it("should return a vaccination summary from querry params", async () => {
      const getVaccinationSummaryMock = jest
        .spyOn(VaccinationService, "findVaccinations")
        // @ts-ignore
        .mockReturnValueOnce(JSON.stringify(summaryPayload));

      const { body, statusCode } = await supertest(app).get(
        "/api/vaccine-summary?c=AT&dateFrom=2020-W10&dateTo=2020-W50&range=5"
      );
      const { summary } = body;

      expect(statusCode).toBe(200);
      expect(summary).toEqual(JSON.stringify(summaryPayload));
      expect(getVaccinationSummaryMock).toHaveBeenCalledWith(query);
    });

    it("should return an empty vaccination summary array", async () => {
      const getVaccinationSummaryMock = jest
        .spyOn(VaccinationService, "findVaccinations")
        // @ts-ignore
        .mockReturnValueOnce(JSON.stringify(summaryPayload1));

      const { body, statusCode } = await supertest(app).get(
        "/api/vaccine-summary?c=AT&dateFrom=2017-W10&dateTo=2017-W50&range=5"
      );

      const { summary } = body;
      expect(statusCode).toBe(200);
      expect(summary).toEqual(JSON.stringify(summaryPayload1));
      expect(getVaccinationSummaryMock).toHaveBeenCalledWith(query1);
    });
  });
});
