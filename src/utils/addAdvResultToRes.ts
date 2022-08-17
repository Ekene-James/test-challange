import { Request } from "express";
export interface AddAdvResultToRes extends Request {
  advancedResult: any;
  status: any;
}
