import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {CommonModule, CommonModule as AppCommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {UserModule} from '../user/user.module';
import {InputTextModule} from 'primeng/inputtext';
import {MatCardModule} from '@angular/material/card';
import {ButtonModule} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

const components = [LoginComponent];
@NgModule({
  declarations: [...components],
  imports: [
    AppCommonModule,
    UserModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    MatCardModule,
    ButtonModule,
    RouterLink,
    MatIconModule,
    MessagesModule,
    MessageModule
  ],
  exports: [...components]
})
export class AuthModule {}
