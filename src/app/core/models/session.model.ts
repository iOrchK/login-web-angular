import { User } from './User.model';

export class Session {
  public token: string;
  public user: User;

  constructor(object?: User) {
    if (object) {
      this.token = object.token;
      this.user = object;
    }
  }
}
