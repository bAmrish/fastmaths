import {Injectable} from '@angular/core';
import {UserService} from '../../user/services/user.service';
import {User} from '../../user/models/user.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {add as dateAdd, differenceInSeconds as dateDiff} from 'date-fns';
import {Principal} from '../models/principal.interface';
import {StorageService} from '../../core/services/storage.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  loggedInUser: User | null = null;
  user = new BehaviorSubject<User | null>(null);
  principal: Principal | null = null;

  constructor(private userService: UserService,
              private storage: StorageService) {
  }

  login(username: string, password: string): boolean {
    const user = this.userService.login(username, password);
    this._login(user?.id || null);
    return this.loggedInUser !== null;
  }

  reLogin() {
    const principal = this.storage.getPrincipal();
    if (!principal) return;

    const diffInSeconds = dateDiff(new Date(principal.expiry), new Date());
    if (diffInSeconds <= 0) return;

    this._login(principal.userId);

  }

  getLoggedInUser(): Observable<User | null> {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  private _login(userId: string | null) {
    this.storage.initializeUser(userId);
    const user = this.storage.getUser(userId || '');
    this.loggedInUser = user;

    if (user != null) {
      this.createPrincipal(user);
    }
    this.user.next(user);
  }

  private createPrincipal(user: User) {
    const expiry = dateAdd(new Date(), {minutes: 30})
    this.principal = {userId: user.id, expiry}
    this.storage.savePrincipal(this.principal);
  }

  logout() {
    this.loggedInUser = null;
    this.storage.removePrincipal();
    this.storage.resetUser();
    this.user.next(null);
  }

}
