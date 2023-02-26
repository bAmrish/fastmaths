import {Component, ViewChild} from '@angular/core';
import {TimerComponent} from "./timer/timer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dofast';
  @ViewChild("timer") timer: TimerComponent;
  started = false;
  completed = false;

  timerComplete() {
    console.log("timerCompleted!");
    this.completed = true;
  }

  start() {
    this.started = true;
    this.timer.start();
  }

  checkAnswers() {
    this.completed = true;
    this.timer.stop();
  }

}

