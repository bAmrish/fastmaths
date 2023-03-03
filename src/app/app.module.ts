import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TimerComponent} from './timer/timer.component';
import {MatCardModule} from '@angular/material/card';
import {SolverComponent} from './paper/components/solver/solver.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {EditConfigComponent} from './paper/components/config/edit/edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {NewPaperComponent} from './paper/components/new/new.component';
import {NotFoundComponent} from './NotFoundComponent/not-found.component';
import {ConfigsComponent} from './paper/components/config/configs.component';
import {MatTableModule} from '@angular/material/table';
import {StarsComponent} from './stars/stars.component';
import {MatChipsModule} from '@angular/material/chips';
import {TimeFormatPipe} from './pipes/time-format.pipe';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {HeaderComponent} from './header/header.component';
import {PapersComponent} from './paper/components/papers.component';
import {ResultComponent} from './paper/components/result/result.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TimerComponent,
    PapersComponent,
    SolverComponent,
    ResultComponent,
    EditConfigComponent,
    ConfigsComponent,
    NewPaperComponent,
    NotFoundComponent,
    StarsComponent,
    TimeFormatPipe
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
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatChipsModule,
    MatSliderModule,
    MatExpansionModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
