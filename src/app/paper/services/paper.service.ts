import {Question} from '../models/question.interface';
import {UtilService} from './util.service';
import {Injectable} from '@angular/core';
import {PaperConfig} from '../models/paper-config.interface';
import {Paper} from '../models/paper.interface';
import {StorageService} from '../../storage/storage.service';
import {Difficulty} from '../models/paper-difficulty';

@Injectable({providedIn: 'root'})
export class PaperService {

  constructor(private storage: StorageService) {
  }

  new(configId: string): Paper | null {
    const config: PaperConfig | null = this.storage.getConfig(configId);
    if (!config) {
      return null;
    }
    const id = UtilService.uuid();
    const name = config.name;
    const difficulty = config.difficulty;
    const started = false;
    const completed = false;
    const totalQuestions = config.totalQuestions;
    const totalTime = totalQuestions * config.timePerQuestion;
    const questions = this.generateQuestions(config);
    const createdOn = new Date();
    const modifiedOn = new Date();

    const paper = {
      id, configId, name, difficulty,
      started, completed,
      questions, totalQuestions, totalTime,
      createdOn, modifiedOn
    }

    this.storage.savePaper(paper);
    return paper;
  }

  getAllPapers(): Paper[] {
    return this.storage.getAllPapers();
  }

  deletePaper(paperId: string): boolean {
    return this.storage.deletePaper(paperId);
  }

  deleteConfig(configId: string): boolean {
    return this.storage.deleteConfig(configId);
  }

  getAllConfigs() {
    return this.storage.getAllConfigs();
  }

  checkAnswers(paper: Paper, solveTime: number) {

    paper.completed = true;

    paper.questions.forEach((question) => {
      question.isCorrect = question.answer === question.solution;
      question.answered = true;
    })

    const correct = paper.questions.filter(q => q.isCorrect).length;
    const incorrect = paper.totalQuestions - correct;
    const percentage = (correct * 100) / paper.totalQuestions;
    const rating = this.getRating(percentage, paper.difficulty);

    paper.stats = {correct, incorrect, solveTime, percentage, rating};

    this.storage.savePaper(paper);
    return paper;
  }

  private getRating(percentage: number, difficulty: Difficulty): number {
    switch (difficulty) {
      case 'Hard':
        return this.getHardRating(percentage);
      case 'Medium':
        return this.getMediumRating(percentage);
      case 'Easy':
        return this.getEasyRating(percentage);
    }
  }

  getEasyRating(percentage: number): number {
    switch (true) {
      case percentage === 100:
        return 5;
      case percentage >= 95 && percentage < 100:
        return 4;
      case percentage >= 85 && percentage < 95:
        return 3;
      case percentage >= 70 && percentage < 85:
        return 2;
      case percentage >= 60 && percentage < 70:
        return 1;
      default:
        return 0;
    }
  }

  getMediumRating(percentage: number): number {
    switch (true) {
      case percentage >= 95:
        return 5;
      case percentage >= 80 && percentage < 95:
        return 4;
      case percentage >= 75 && percentage < 80:
        return 3;
      case percentage >= 70 && percentage < 75:
        return 2;
      case percentage >= 60 && percentage < 70:
        return 1;
      default:
        return 0;
    }
  }

  getHardRating(percentage: number): number {
    switch (true) {
      case percentage >= 90:
        return 5;
      case percentage >= 75 && percentage < 90:
        return 4;
      case percentage >= 60 && percentage < 75:
        return 3;
      case percentage >= 50 && percentage < 60:
        return 2;
      case percentage >= 40 && percentage < 50:
        return 1;
      default:
        return 0;
    }
  }

  generateQuestions(config: PaperConfig): Question[] {
    let questions: Question[] = [];
    for (let i = 0; i < config.totalQuestions; i++) {
      const opSelector = UtilService.getRandomInt(0, config.operators.length - 1)
      const operator = config.operators[opSelector];
      switch (operator) {
        case 'ADD':
          questions.push(this.newAdditionQuestion(config));
          break;
        case 'SUBTRACT':
          questions.push(this.newSubtractionQuestion(config));
          break;
        case 'MULTIPLY':
          questions.push(this.newMultiplicationQuestion(config));
          break;
        case 'DIVIDE':
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
