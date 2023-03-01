import {Component, OnInit} from '@angular/core';
import {PaperService} from '../../services/paper.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../storage/storage.service';
import {PaperConfig} from '../../models/paper-config.interface';

@Component({
  selector: 'app-new-paper',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewPaperComponent implements OnInit {

  paperConfig: PaperConfig;
  hasError = false;

  constructor(private paperService: PaperService,
              private route: ActivatedRoute,
              private router: Router,
              private storage: StorageService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const configId = params['config'];
      if(!configId || configId.trim() === '') {
        this.hasError = true;
        return
      }

      this.paperConfig = this.storage.get(configId);
      if(!this.paperConfig) {
        this.hasError = true;
      }
    })
  }

  start() {
    const paper = this.paperService.new(this.paperConfig.id);
    this.router.navigate(['..', paper.id, 'solve'], {
      relativeTo: this.route
    }).then();
  }

  onCreateNew(){
    this.router.navigate(['../..', 'config', 'new'], {
      relativeTo: this.route
    }).then();
  }
}
