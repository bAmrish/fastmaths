import {Injectable} from '@angular/core';
import {StorageService} from '../../core/services/storage.service';
import {User} from '../models/user.interface';
import {UtilService} from '../../common/services/util.service';
import Hashes from 'jshashes';

@Injectable({providedIn: 'root'})
export class UserService {
  hash = new Hashes.SHA256();

  constructor(private storage: StorageService) {
  }

  newUser(user: User, password: string): User {
    user.id = UtilService.uuid();
    user.password = this.hash.hex(password);
    this.storage.saveUser(user);
    return user;
  }

  getUser(id: string): User | null {
    return this.storage.getUser(id)
  }

  saveUser(user: User): User {
    this.storage.saveUser(user);
    return user;
  }

  login(username: string, password: string): User | null {
    const user = this.storage.getUserByUsername(username);
    if (!user) return null;

    return user.password === this.hash.hex(password) ? user : null;
  }

}
