import {Injectable} from '@angular/core';
import {PaperConfig} from '../../paper/models/paper-config.interface';
import {Paper} from '../../paper/models/paper.interface';
import {User} from '../../user/models/user.interface';
import {Principal} from '../../auth/models/principal.interface';
import {UtilService as u} from '../../common/services/util.service';

@Injectable({providedIn: 'root'})
export class StorageService {
  users: { [key: string]: User } = {};
  user: User | null;
  configs: { [key: string]: PaperConfig } = {};
  papers: { [key: string]: Paper } = {};

  initialize() {
    const users = localStorage.getItem('users');
    if (!users) {
      this.users = {};
      this.saveUsers();
    } else {
      this.users = JSON.parse(users) as { [key: string]: User };
    }
  }

  initializeUser(userId: string | null) {
    this.user = this.getUser(userId || '');
    if (!this.user) {
      this.resetUser()
      return;
    }

    this.configs = this.user.configs;
    this.papers = this.user.papers;
  }

  resetUser() {
    this.user = null;
    this.configs = {}
    this.papers = {}
  }

  // ---- Config Methods -----
  saveConfig(config: PaperConfig) {
    this.configs[config.id] = config;
    this.saveConfigs();
  }

  getConfig(id: string): PaperConfig | null {
    const config = this.configs[id];
    if (!config) return null
    return u.clone(config);
  }

  getAllConfigs(): PaperConfig[] {
    const configs: PaperConfig[] = [];
    for (let key in this.configs) {
      if (this.configs.hasOwnProperty(key)) {
        configs.push(this.configs[key])
      }
    }
    return u.clone(configs);
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
    if (!this.user) {
      console.warn('No user found to save the config.');
      return
    }
    this.user.configs = this.configs
    this.saveUser(this.user);
  }

  // ---- Paper Methods -----
  savePaper(paper: Paper) {
    this.papers[paper.id] = paper;
    this.savePapers()
  }

  getPaper(id: string): Paper | null {
    const paper = this.papers[id];
    if (!paper) return null;
    return u.clone(paper);
  }

  getAllPapers(): Paper[] {
    const papers: Paper[] = [];
    for (let key in this.papers) {
      if (this.papers.hasOwnProperty(key)) {
        papers.push(this.papers[key])
      }
    }
    return u.clone(papers);
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
    if (!this.user) {
      console.warn('No user found to save papers.');
      return
    }
    this.user.papers = this.papers;
    this.saveUser(this.user);
  }

  // ---- User Methods -----
  saveUser(user: User) {
    if (!user?.id) return;
    this.users[user.id] = user;
    this.saveUsers();
  }

  getUser(id: string): User | null {
    const user = this.users[id];
    if (!user) return null;
    return u.clone(user);
  }

  getUserByUsername(username: string): User | null {
    for (let id in this.users) {
      if (this.users.hasOwnProperty(id)) {
        const user = this.users[id];
        if (user.username === username) {
          return u.clone(user);
        }
      }
    }
    return null;
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

  // ---- Principal Object Methods ----
  savePrincipal(principal: Principal) {
    const principalString = JSON.stringify(principal);
    localStorage.setItem('principal', principalString);
  }

  removePrincipal() {
    localStorage.removeItem('principal');
  }

  getPrincipal(): Principal | null {
    const principalString = localStorage.getItem('principal');
    if (!principalString) return null;
    return JSON.parse(principalString) as Principal;
  }
}
