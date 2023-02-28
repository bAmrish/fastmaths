import {Operator} from "./operator.type";

export interface Question {
  id: string;
  operator: Operator;
  firstNumber: number;
  secondNumber: number;
  answer: null | number;
  solution: number;
  answered: boolean;
  isCorrect: boolean;
}
