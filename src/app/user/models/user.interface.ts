import {PaperConfig} from '../../paper/models/paper-config.interface';
import {Paper} from '../../paper/models/paper.interface';

export const UserTypeValues: ('Student' | 'Parent' | 'Teacher' | 'Internal')[]
  = ['Student', 'Parent', 'Teacher', 'Internal'];
export type UserType = typeof UserTypeValues[number];

export const UserRoleValues: ('User' | 'Admin' | 'Super')[] =
  ['User', 'Admin', 'Super'];
export type UserRole = typeof UserRoleValues[number];

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string
  password: string;
  type: UserType;
  role: UserRole;
  configs: { [key: string]: PaperConfig };
  papers: { [key: string]: Paper };
  createdOn: Date;
  modifiedOn: Date;
}
