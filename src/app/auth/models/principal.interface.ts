import {User} from '../../user/models/user.interface';

export interface Principal {
  user: User;
  expiry: Date;
}
