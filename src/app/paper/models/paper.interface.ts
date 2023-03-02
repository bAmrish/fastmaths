import {Question} from './question.interface';

export interface Paper {
  id: string;
  configId: string;
  name: string;
  questions: Question[];
  totalQuestions: number;
  totalTime: number;
  started: boolean;
  completed: boolean;
  stats?: {
    correct: number;
    incorrect: number;
    solveTime: number;
    percentage: number;
    rating?: number;
  }
  createdOn: Date;
  modifiedOn?: Date;
}
