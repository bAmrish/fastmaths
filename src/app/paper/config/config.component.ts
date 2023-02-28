import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaperConfig} from '../models/paper-config.interface';

@Component({
  selector: 'app-paper-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class PaperConfigComponent {
  @Input() config: PaperConfig = {
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

  @Output() configChange = new EventEmitter<PaperConfig>();

  onConfigChange() {
    this.configChange.emit(this.config);
  }
}
