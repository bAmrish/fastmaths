import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  elapsedTime = 0;

  @Input() maxInSeconds: number;
  @Input() stopOnZero = true;
  @Output() onChange = new EventEmitter<number>();
  @Output() onFinish = new EventEmitter<void>();

  startTime: number;
  endTime: number;
  remainingTime: number;
  overTime: boolean;
  timer: ReturnType<typeof setInterval> | undefined;


  ngOnInit() {
    // this.start();
  }

  start() {
    const now = () => new Date().getTime();
    const max = this.maxInSeconds;

    this.startTime = now();
    this.endTime = now() + max * 1000;
    this.remainingTime = max;

    this.timer = setInterval(() => {
      this.remainingTime = Math.round((this.endTime - now()) / 1000);
      this.elapsedTime += 100 / max;
      this.overTime = this.remainingTime <= 0;
      if (this.overTime) {
        this.onFinish.emit();
      }
      if (this.overTime && this.stopOnZero) {
        clearInterval(this.timer);
      }
      this.onChange.emit(this.remainingTime);
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
  }

  formatTime(timeInSeconds: number): string {
    if (isNaN(timeInSeconds)) {
      timeInSeconds = 0;
    }
    const time = Math.abs(timeInSeconds)
    const sec = this.td(time % 60);
    const min = this.td(Math.floor(time / 60));
    return `${min}:${sec}`
  }

  td(n: number): string {
    return n >= 10 ? `${n}` : `0${n}`;
  }
}
