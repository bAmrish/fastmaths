import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'Fast Maths';
  routerLinks: {text: string, command: string[]}[] = [
    {text: 'My Tests', command: ['paper']},
    {text: 'Take Test', command: ['paper', 'config']},
    {text: 'Create Test', command: ['paper', 'config', 'new']},
  ]
  @Output() menuClicked = new EventEmitter<void>();

  onMenuClicked() {
    this.menuClicked.emit();
  }
}
