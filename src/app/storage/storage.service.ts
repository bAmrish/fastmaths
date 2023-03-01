import {Injectable} from '@angular/core';
import {PaperConfig} from '../paper/models/paper-config.interface';
import {Paper} from '../paper/models/paper.interface';

@Injectable({providedIn: 'root'})
export class StorageService {
  configs: { [key: string]: PaperConfig } = {};
  papers: { [key: string]: Paper } = {};

  initialize() {
    const configs = localStorage.getItem('configs');
    const papers = localStorage.getItem('papers');
    this.configs = configs ? JSON.parse(configs) as { [key: string]: PaperConfig } : {};
    this.papers = papers ? JSON.parse(papers) as { [key: string]: Paper } : {};
  }

  saveConfig(config: PaperConfig) {
    this.configs[config.id] = config;
    localStorage.setItem('configs', JSON.stringify(this.configs));
  }

  getConfig(id: string): PaperConfig | null {
    return this.configs[id] ? this.configs[id] : null
  }

  getAllConfigs(): PaperConfig[] {
    const configs: PaperConfig[] = [];
    for (let key in this.configs) {
      if (this.configs.hasOwnProperty(key)) {
        configs.push(this.configs[key])
      }
    }
    return configs;
  }

  savePaper(paper: Paper) {
    this.papers[paper.id] = paper;
    localStorage.setItem('papers', JSON.stringify(this.papers));
  }

  getPaper(id: string): Paper | null {
    return this.papers[id] ? this.papers[id] : null
  }
}
