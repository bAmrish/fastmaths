import {Operator} from "./operator.type";

export interface PaperConfig {
  id: string;
  name: string;
  timePerQuestion: number;
  operators: Operator[];
  totalQuestions: number;
  addition: {
    min: number, max: number
  };
  subtraction: {
    min: number, max: number
  }
  multiplication: {
    min: number, max: number
  };
  division: {
    min: number, max: number
  };
  createdOn: Date;
  modifiedOn?: Date;
}
