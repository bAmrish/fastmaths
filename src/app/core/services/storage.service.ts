import {Injectable} from '@angular/core';
import {PaperConfig} from '../../paper/models/paper-config.interface';
import {Paper} from '../../paper/models/paper.interface';
import {User} from '../../user/models/user.interface';

@Injectable({providedIn: 'root'})
export class StorageService {
  configs: { [key: string]: PaperConfig } = {};
  papers: { [key: string]: Paper } = {};
  users: { [key: string]: User } = {};

  initialize() {
    const configs = localStorage.getItem('configs');
    const papers = localStorage.getItem('papers');
    const users = localStorage.getItem('users');
    this.configs = configs ? JSON.parse(configs) as { [key: string]: PaperConfig } : {};
    this.papers = papers ? JSON.parse(papers) as { [key: string]: Paper } : {};
    this.users = users ? JSON.parse(users) as { [key: string]: User } : {};
  }

  // ---- Config Methods -----
  saveConfig(config: PaperConfig) {
    this.configs[config.id] = config;
    this.saveConfigs();
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

  deleteConfig(configId: string): boolean {
    const config = this.configs[configId];
    if (config) {
      delete this.configs[configId];
      this.saveConfigs();
      return true;
    }
    return false;
  }

  private saveConfigs() {
    localStorage.setItem('configs', JSON.stringify(this.configs));
  }

  // ---- Paper Methods -----
  savePaper(paper: Paper) {
    this.papers[paper.id] = paper;
    this.savePapers()
  }

  getPaper(id: string): Paper | null {
    return this.papers[id] ? this.papers[id] : null
  }

  getAllPapers(): Paper[] {
    const papers: Paper[] = [];
    for (let key in this.papers) {
      if (this.papers.hasOwnProperty(key)) {
        papers.push(this.papers[key])
      }
    }
    return papers;
  }

  deletePaper(paperId: string): boolean {
    const paper = this.papers[paperId];
    if (paper) {
      delete this.papers[paperId];
      this.savePapers();
      return true;
    }
    return false;
  }

  private savePapers() {
    localStorage.setItem('papers', JSON.stringify(this.papers));
  }

  // ---- User Methods -----
  saveUser(user: User) {
    this.users[user.id] = user;
    this.saveUsers();
  }

  getUser(id: string): User | null {
    return this.users[id] ? this.users[id] : null
  }

  getAllUsers(): User[] {
    const users: User[] = [];
    for (let key in this.users) {
      if (this.users.hasOwnProperty(key)) {
        users.push(this.users[key])
      }
    }
    return users;
  }

  deleteUser(userId: string): boolean {
    const user = this.users[userId];
    if (user) {
      delete this.users[userId];
      this.saveUsers();
      return true;
    }
    return false;
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
