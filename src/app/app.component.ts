import {Component, ViewChild} from '@angular/core';
import {StorageService} from './storage/storage.service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sideNav') sideNav: MatSidenav;

  routerLinks: { text: string, command: string[] }[] = [
    {text: 'My Tests', command: ['paper']},
    {text: 'Take Test', command: ['paper', 'config']},
    {text: 'Create Test', command: ['paper', 'config', 'new']},
  ]

  constructor(storageService: StorageService) {
    storageService.initialize();
  }

  onLinkClicked() {
    this.sideNav.close().then();
  }

  onMenuClick() {
    this.sideNav.toggle().then();
  }
}

