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
          questions.push(this.newAdditionQuestion(config));
          break;
        case "SUBTRACT":
          questions.push(this.newSubtractionQuestion(config));
          break;
        case "MULTIPLY":
          questions.push(this.newMultiplicationQuestion(config));
          break;
        case "DIVIDE":
          questions.push(this.newDivisionQuestion(config));
          break;
      }
    }
    return questions;
  }

  newAdditionQuestion(config: PaperConfig): Question {
    const min = config.addition.min
    const max = config.addition.max
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

  newSubtractionQuestion(config: PaperConfig): Question {
    const min = config.subtraction.min
    const max = config.subtraction.max
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

  newMultiplicationQuestion(config: PaperConfig): Question {
    const min = config.multiplication.min
    const max = config.multiplication.max
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

  newDivisionQuestion(config: PaperConfig): Question {
    const min = config.division.min
    const max = config.division.max
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
