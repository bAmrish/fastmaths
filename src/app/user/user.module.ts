import {EditUserComponent} from './components/edit-user/edit-user.component';
import {NgModule} from '@angular/core';
import {CommonModule as AppCommonModule} from '../common/common.module'
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {InputTextModule} from 'primeng/inputtext';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

const components = [EditUserComponent]

@NgModule({
  declarations: [...components],
  imports: [
    AppCommonModule,
    CommonModule,
    MatIconModule,
    InputTextModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [...components]
})
export class UserModule {
}
