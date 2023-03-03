import {Component, OnInit, ViewChild} from '@angular/core';
import {TimerComponent} from '../../../timer/timer.component';
import {PaperService} from '../../services/paper.service';
import {Operator} from '../../models/operator.type';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../storage/storage.service';
import {Paper} from '../../models/paper.interface';
import formatRelative from 'date-fns/formatRelative';

@Component({
  selector: 'app-paper',
  templateUrl: './solver.component.html',
  styleUrls: ['./solver.component.scss']
})
export class SolverComponent implements OnInit {
  @ViewChild('timer') timer: TimerComponent;
  paper: Paper;
  hasError = false;

  constructor(private paperService: PaperService,
              private route: ActivatedRoute,
              private router: Router,
              private storage: StorageService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const paperId = params.get('id')?.toString();
      if (!paperId || paperId.trim() === '') {
        this.hasError = true;
        return;
      }
      const paper = this.storage.getPaper(paperId);

      if (!paper) {
        this.hasError = true;
        return;
      }
      this.paper = paper;
      this.start();

    })
  }

  timerComplete() {
    this.paper.completed = true;
    this.onCheckAnswers();
  }

  start() {
    if (this.paper.completed) {
      return;
    }
    this.paper.started = true;
    this.paper.completed = false;

    setTimeout(() => this.timer.start(), 1);
  }

  onNewConfig() {
    this.router.navigate(['../..', 'config', 'new'], {
      relativeTo: this.route
    }).then();
  }

  onNewPaper() {
    this.router.navigate(['../..', 'new'], {
      relativeTo: this.route,
      queryParams: {
        config: this.paper.configId
      }
    }).then();
  }

  onCheckAnswers() {
    this.timer.stop();
    const solveTime = this.timer.getCurrentTime();
    this.paper = this.paperService.checkAnswers(this.paper, solveTime);
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

  getDate(date: Date) {
    const d = new Date(date);
    const b = new Date();
    return formatRelative(d, b)
  }
}
