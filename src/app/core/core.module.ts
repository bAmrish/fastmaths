import {HeaderComponent} from './components/header/header.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule as AppCommonModule} from '../common/common.module';
import {CommonModule} from '@angular/common';
import {MessagesModule} from 'primeng/messages';
import {SharedModule} from 'primeng/api';

const components = [
  HeaderComponent,
  NotFoundComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    //Core Angular Modules
    CommonModule,
    RouterLink,
    RouterLinkActive,

    // Other App Modules
    AppCommonModule,

    //Material UI Modules
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MessagesModule,
    SharedModule,
  ],
  exports: [...components]
})
export class CoreModule {
}
