import {Question} from "../models/question.interface";
import {UtilService} from "./util.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class PaperService {
  generateQuestions(totalQuestions = 0): Question[] {
    let questions: Question[] = [];
    for (let i = 0; i < totalQuestions; i++) {
      questions.push(this.getNewQuestion());
    }
    return questions;
  }

  getNewQuestion(): Question {
    const min = 1
    const max = 10
    const id = UtilService.uuid();
    const operator = 'ADD'
    const firstNumber = UtilService.getRandomInt(min, max);
    const secondNumber = UtilService.getRandomInt(min, max);
    const answer = null;
    const solution = firstNumber + secondNumber;
    const answered = false;
    const isCorrect = false;

    return {
      id,
      operator, firstNumber, secondNumber,
      answer, solution,
      answered, isCorrect
    }
  }
}
