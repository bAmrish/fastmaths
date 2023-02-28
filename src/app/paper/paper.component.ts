import {Component, ViewChild} from '@angular/core';
import {TimerComponent} from '../timer/timer.component';
import {Question} from './models/question.interface';
import {PaperService} from './services/paper.service';
import {Operator} from './models/operator.type';
import {PaperConfig} from './models/paper-config.interface';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss']
})
export class PaperComponent {
  @ViewChild('timer') timer: TimerComponent;
  started = false;
  completed = false;
  questions: Question[] = [];
  totalTime: number;

  paperConfig: PaperConfig = {
    timePerQuestion: 10,
    operators: ['ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE'],
    totalQuestions: 5,
    addition: {
      min: 1, max: 10
    },
    subtraction: {
      min: 1, max: 10
    },
    multiplication: {
      min: 1, max: 10
    },
    division: {
      min: 1, max: 10
    },
  }

  constructor(private paperService: PaperService) {
  }

  timerComplete() {
    this.completed = true;
    this.checkAnswers();
  }

  newPaper() {
    this.started = false;
    this.completed = false;
  }

  start() {
    this.started = true;
    this.completed = false;
    this.totalTime = +this.paperConfig.totalQuestions * +this.paperConfig.timePerQuestion;
    this.questions = this.paperService.generateQuestions(this.paperConfig);
    setTimeout(() => this.timer.start(), 1);
  }

  checkAnswers() {
    this.completed = true;
    this.timer.stop();
    this.questions.forEach((question) => {
      question.isCorrect = question.answer === question.solution;
      question.answered = true;
    })
  }

  getOperatorSymbol(operator: Operator): string {
    switch (operator) {
      case 'ADD':
        return '+';
      case 'SUBTRACT':
        return '-';
      case 'MULTIPLY':
        return '×';
      case 'DIVIDE':
        return '÷';
    }
  }
}
