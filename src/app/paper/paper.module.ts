import {NgModule} from '@angular/core';
import {PapersComponent} from './components/papers.component';
import {SolverComponent} from './components/solver/solver.component';
import {ResultComponent} from './components/result/result.component';
import {EditConfigComponent} from './components/config/edit/edit.component';
import {ConfigsComponent} from './components/config/configs.component';
import {NewPaperComponent} from './components/new/new.component';
import {CommonModule} from '@angular/common';
import {CommonModule as AppCommonModule} from '../common/common.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

const components = [
  PapersComponent,
  SolverComponent,
  ResultComponent,
  EditConfigComponent,
  ConfigsComponent,
  NewPaperComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    AppCommonModule,

    ReactiveFormsModule,
    FormsModule,
    CommonModule,

    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    RouterLink,
    MatMenuModule,
    MatExpansionModule,
    MatIconModule
  ],
  exports: [...components],
})
export class PaperModule {
}
