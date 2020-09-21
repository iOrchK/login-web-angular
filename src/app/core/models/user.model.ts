import { Role } from './role.model';

export class User {
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public token: string;

  constructor(object?: any) {
    this.name = object && object.name ? object.name : null;
    this.email = object && object.email ? object.email : null;
    this.password = object && object.password ? object.password : null;
    this.role = object && object.role ? object.role : Role.User;
    this.token = object && object.token ? object.token : null;
  }
}
