import {Paper} from '../../models/paper.interface';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-paper-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() paper: Paper;

  percentage(): number {
    return Math.round(this.paper.stats?.percentage || 0);
  }

  rating() {
    return this.paper.stats?.rating || 0;
  }

  getMessage(): string {
    const rating = this.rating();
    switch (rating) {
      case 5:
        return `That was Awesome!! You are a Genius. 😻😻  You get `;
      case 4:
        return `That was good! 🐱🐱 You get `;
      case 3:
        return `That was OK. You could do better. 😼😼 You get `;
      case 2:
        return `You seriously need a lot of practice. 😾😾 You get `;
      case 1:
        return `Ugh!! What was that? 😿😿 You get `;
      default:
        return `Are you even trying? 🙀 You get `;
    }
  }
}
