import {Component} from '@angular/core';
import {StorageService} from './storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(storageService: StorageService) {
    storageService.initialize();
  }
}

