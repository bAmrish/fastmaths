import {Question} from './question.interface';
import {Difficulty} from './paper-difficulty';

export interface Paper {
  id: string;
  configId: string;
  name: string;
  difficulty: Difficulty;
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
  modifiedOn: Date;
}
