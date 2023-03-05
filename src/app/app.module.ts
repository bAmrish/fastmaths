import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {PaperModule} from './paper/paper.module';
import {UserModule} from './user/user.module';
import {CoreModule} from './core/core.module';
import {CommonModule} from '@angular/common';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //Core Angular Modules
    BrowserModule,
    BrowserAnimationsModule,

    // Other App Modules
    CoreModule,
    CommonModule,
    UserModule,
    AuthModule,
    PaperModule,
    AppRoutingModule,

    //Material UI Modules
    MatCardModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
