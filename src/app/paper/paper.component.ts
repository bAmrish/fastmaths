import {Component, ViewChild} from "@angular/core";
import {TimerComponent} from "../timer/timer.component";
import {Operator, Question} from "./models/question.interface";
import {PaperService} from "./services/paper.service";

@Component({
  selector: "app-paper",
  templateUrl: "./paper.component.html",
  styleUrls: ['./paper.component.scss']
})
export class PaperComponent {
  @ViewChild("timer") timer: TimerComponent;
  started = false;
  completed = false;
  questions: Question[] = [];
  totalTime: number;
  totalQuestions = 5;
  timePerQuestion = 2;

  constructor(private paperService: PaperService) {
  }

  timerComplete() {
    this.completed = true;
    this.checkAnswers();
  }

  start() {
    this.started = true;
    this.completed = false;
    this.totalTime = this.totalQuestions * this.timePerQuestion;
    this.questions = this.paperService.generateQuestions(this.totalQuestions);
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
      case "ADD":
        return '+';
      case "SUBTRACT":
        return '-';
      case "MULTIPLY":
        return '×';
      case "DIVIDE":
        return '÷';
    }
  }
}
