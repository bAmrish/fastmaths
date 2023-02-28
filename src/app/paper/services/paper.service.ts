import {Question} from "../models/question.interface";
import {UtilService} from "./util.service";
import {Injectable} from "@angular/core";
import {PaperConfig} from "../models/paper-config.interface";

@Injectable({providedIn: 'root'})
export class PaperService {

  generateQuestions(config: PaperConfig): Question[] {
    let questions: Question[] = [];
    for (let i = 0; i < config.totalQuestions; i++) {
      const opSelector = UtilService.getRandomInt(0, config.operators.length - 1)
      const operator = config.operators[opSelector];
      switch (operator) {
        case "ADD":
          questions.push(this.newAdditionQuestion());
          break;
        case "SUBTRACT":
          questions.push(this.newSubtractionQuestion());
          break;
        case "MULTIPLY":
          questions.push(this.newMultiplicationQuestion());
          break;
        case "DIVIDE":
          questions.push(this.newDivisionQuestion());
          break;
      }
    }
    return questions;
  }

  newAdditionQuestion(): Question {
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

  newSubtractionQuestion(): Question {
    const min = 1
    const max = 10
    const id = UtilService.uuid();
    const operator = 'SUBTRACT'
    const firstNumber = UtilService.getRandomInt(min, max);
    const secondNumber = UtilService.getRandomInt(min, firstNumber);
    const answer = null;
    const solution = firstNumber - secondNumber;
    const answered = false;
    const isCorrect = false;

    return {
      id,
      operator, firstNumber, secondNumber,
      answer, solution,
      answered, isCorrect
    }
  }

  newMultiplicationQuestion(): Question {
    const min = 2
    const max = 10
    const id = UtilService.uuid();
    const operator = 'MULTIPLY'
    const firstNumber = UtilService.getRandomInt(min, max);
    const secondNumber = UtilService.getRandomInt(min, max);
    const answer = null;
    const solution = firstNumber * secondNumber;
    const answered = false;
    const isCorrect = false;

    return {
      id,
      operator, firstNumber, secondNumber,
      answer, solution,
      answered, isCorrect
    }
  }

  newDivisionQuestion(): Question {
    const min = 2
    const max = 10
    const id = UtilService.uuid();
    const operator = 'DIVIDE'
    const secondNumber = UtilService.getRandomInt(min, max);
    const solution = UtilService.getRandomInt(min, max);
    const answer = null;
    const firstNumber = solution * secondNumber;
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
