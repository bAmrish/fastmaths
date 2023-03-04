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
  confirmPassword?: string;
  type: UserType;
  role: UserRole;
  createdOn: Date;
  modifiedOn: Date;
}
