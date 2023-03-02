import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnChanges {
  @Input() filled = 0;
  @Input() total = 5;
  filledStars: number[] = [];
  unfilled: number[] = [];

  ngOnChanges() {
    this.filledStars = [...Array(this.filled).keys()];
    this.unfilled = [...Array(this.total - this.filled).keys()];
  }

}
