import VaccinationModel, {
  VaccinationDocument,
  VaccinationInput,
} from "../models/vaccination.model";
import logger from "../utils/logger";
import { FilterQuery } from "mongoose";
import { customLoop, returnData } from "../utils/loopFunc";

interface Query {
  c: string;
  dateFrom: string;
  dateTo: string;
  range: string;
}

export async function createVaccination(input: VaccinationInput) {
  try {
    const result = await VaccinationModel.create(input);

    return result;
  } catch (e: any) {
    logger.error(e);
    throw new Error(e);
  }
}

export async function findVaccinations(query: FilterQuery<Query>) {
  const { c, dateFrom, dateTo, range } = query;
  const rangeNum = Number(range);
  let boundaryRange: string[] = [];
  let startYear, startWeek, endYear, endWeek: number;

  const startDate: ["2020", "W10"] = dateFrom.split("-");
  const endDate: ["2020", "W20"] = dateTo.split("-");

  startYear = Number(startDate[0]);
  startWeek = Number(startDate[1].slice(1));

  endYear = Number(endDate[0]);
  endWeek = Number(endDate[1].slice(1));

  //if start year !== end year, then it spans through more than one year

  if (startYear === endYear) {
    const loop: returnData = customLoop(
      startWeek,
      endWeek,
      rangeNum,
      startYear
    );
    const { theRange } = loop;
    boundaryRange = [...theRange];
  } else {
    const baseCase: number = endYear - startYear + 1;
    let counter: number = 1;
    let curentYr: number = startYear;
    let skipYr: number = 0;

    function calculateInteryear(strtWk: number, endWk: number, rangeN: number) {
      if (counter <= baseCase) {
        if (counter === 1) {
          //when its the first yr
          const loop: returnData = customLoop(strtWk, 53, rangeN, curentYr);
          const { skip, theRange } = loop;
          boundaryRange = [...boundaryRange, ...theRange];
          skipYr = skip;
        } else if (counter === baseCase) {
          //when its the last yr
          const loop: returnData = customLoop(
            1 + skipYr,
            endWk,
            rangeN,
            curentYr
          );
          const { theRange } = loop;
          boundaryRange = [...boundaryRange, ...theRange];
        } else {
          //when its the middle yr
          const loop: returnData = customLoop(1 + skipYr, 53, rangeN, curentYr);
          const { skip, theRange } = loop;
          boundaryRange = [...boundaryRange, ...theRange];
          skipYr = skip;
        }
        counter += 1;
        curentYr += 1;
        calculateInteryear(strtWk, endWk, rangeN);
      }
    }
    calculateInteryear(startWeek, endWeek, rangeNum);
  }

  try {
    const result = await VaccinationModel.aggregate([
      {
        $match: {
          ReportingCountry: c,
        },
      },
      {
        $bucket: {
          groupBy: "$YearWeekISO",
          boundaries: [...boundaryRange],
          default: "others",
          output: {
            NumberDosesReceived: {
              $sum: "$NumberDosesReceived",
            },
          },
        },
      },
      {
        $addFields: {
          range: rangeNum,
        },
      },
      {
        $addFields: {
          weekStart: "$_id",
          weekEnd: {
            $function: {
              body: "function(id,range) {\n      const arr = id.split('-')\n      const year = arr[0];\n      let week;\n      let result=''\n      if(arr[1]){\n       week = arr[1].slice(1);\n        result=`${year}-W${Number(week) + range}`\n\n              }\n\n               return result\n        }",
              args: ["$_id", "$range"],
              lang: "js",
            },
          },
        },
      },
      {
        $unset: ["_id", "range"],
      },
      {
        $match: {
          weekEnd: {
            $ne: "",
          },
        },
      },
      {
        $sort: {
          weekStart: 1,
        },
      },
    ]);

    return result;
  } catch (e: any) {
    logger.error(e);
    throw new Error(e);
  }
}
