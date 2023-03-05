import {Injectable} from '@angular/core';
import {UserService} from '../../user/services/user.service';
import {User} from '../../user/models/user.interface';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  loggedInUser: User | null = null;
  user = new BehaviorSubject<User | null>(null);

  constructor(private userService: UserService) {
  }

  login(username: string, password: string): boolean {
    this.loggedInUser = this.userService.login(username, password);
    this.user.next(this.loggedInUser);
    return this.loggedInUser !== null;
  }

  getLoggedInUser(): Observable<User | null> {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }
}
