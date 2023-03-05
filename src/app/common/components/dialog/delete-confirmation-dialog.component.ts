import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from './dialog-data.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmation {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }
}
