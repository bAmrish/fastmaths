import {Component, OnInit} from '@angular/core';
import {PaperService} from '../services/paper.service';
import {Paper} from '../models/paper.interface';
import formatRelative from 'date-fns/formatRelative';
import {MatDialog} from '@angular/material/dialog';
import {DeleteConfirmation} from '../../common/components/dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {
  papers: Paper[];
  columns = ['name', 'actions']

  constructor(private paperService: PaperService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.papers = this.paperService
      .getAllPapers()
      .sort((a, b) =>
        new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
      );

  }

  getDate(date: Date) {
    const d = new Date(date);
    const b = new Date();
    return formatRelative(d, b)
  }

  confirmDelete(paper: Paper): void {
    const dialogRef = this.dialog.open(DeleteConfirmation, {
      data: {name: paper.name, type: 'paper'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const success = this.paperService.deletePaper(paper.id);
        if (success) {
          this.papers = this.paperService.getAllPapers()
        }
      }
    });
  }
}
