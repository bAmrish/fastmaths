import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TimerComponent} from "./timer/timer.component";
import {MatCardModule} from "@angular/material/card";
import {SolverComponent} from "./paper/components/solver/solver.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {EditConfigComponent} from './paper/components/config/edit/edit.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {NewPaperComponent} from './paper/components/new/new.component';
import {NotFoundComponent} from './NotFoundComponent/not-found.component';
import {ConfigsComponent} from './paper/components/config/configs.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    SolverComponent,
    EditConfigComponent,
    ConfigsComponent,
    NewPaperComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonToggleModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
