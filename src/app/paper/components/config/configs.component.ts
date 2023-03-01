import {Component, OnInit} from '@angular/core';
import {PaperService} from '../../services/paper.service';
import {PaperConfig} from '../../models/paper-config.interface';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent implements OnInit {
  configs: PaperConfig[] = [];
  columns =  ['name', 'actions']
  constructor(private paperService: PaperService) {
  }

  ngOnInit() {

    this.configs = this.paperService.getAllConfigs();
  }
}
