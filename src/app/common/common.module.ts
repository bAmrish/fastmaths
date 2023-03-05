import {NgModule} from '@angular/core';
import {StarsComponent} from './components/stars/stars.component';
import {TimeFormatPipe} from './pipes/time-format.pipe';
import {DeleteConfirmation} from './components/dialog/delete-confirmation-dialog.component';
import {TimerComponent} from './components/timer/timer.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule as AngularCommon} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const components = [
  StarsComponent,
  TimeFormatPipe,
  DeleteConfirmation,
  TimerComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    AngularCommon,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  exports: [...components],
})
export class CommonModule {

}
