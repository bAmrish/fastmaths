import {Component, OnInit} from '@angular/core';
import {PaperService} from '../services/paper.service';
import {Paper} from '../models/paper.interface';
import formatRelative from 'date-fns/formatRelative';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {
  papers: Paper[];
  columns = ['name', 'actions']

  constructor(private paperService: PaperService) {
  }

  ngOnInit() {
    this.papers = this.paperService.getAllPapers()
    this.papers = this.papers.sort((a, b) => {
        const n1 = new Date(a.createdOn).getMilliseconds();
        const n2 = new Date(b.createdOn).getMilliseconds();
        return n2 - n1;
      }
    )
  }

  getDate(date: Date) {
    const d = new Date(date);
    const b = new Date();
    return formatRelative(d, b)
  }
}
