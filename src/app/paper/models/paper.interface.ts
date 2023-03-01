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
  createdOn: Date;
  modifiedOn?: Date;
}
