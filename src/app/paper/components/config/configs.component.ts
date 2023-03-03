import {Component, OnInit} from '@angular/core';
import {PaperService} from '../../services/paper.service';
import {PaperConfig} from '../../models/paper-config.interface';
import {MatDialog} from '@angular/material/dialog';
import {DeleteConfirmation} from '../../../dialog/delete-confirmation-dialog.component';
import formatRelative from 'date-fns/formatRelative';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent implements OnInit {
  configs: PaperConfig[] = [];
  columns = ['name', 'actions']

  constructor(private paperService: PaperService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.configs = this.paperService.getAllConfigs()
      .sort((a, b) =>
        new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
      );

  }

  confirmDelete(config: PaperConfig): void {
    const dialogRef = this.dialog.open(DeleteConfirmation, {
      data: {name: config.name, type: 'config'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const success = this.paperService.deleteConfig(config.id);
        if (success) {
          this.configs = this.paperService.getAllConfigs()
        }
      }
    });
  }

  getDate(date: Date) {
    const d = new Date(date);
    const b = new Date();
    return formatRelative(d, b)
  }

}
