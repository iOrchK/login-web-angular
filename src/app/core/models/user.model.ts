export class User {
  public name: string;
  public email: string;
  public password: string;
  public token: string;

  constructor(object?: any) {
    this.name = object && object.name ? object.name : null;
    this.email = object && object.email ? object.email : null;
    this.password = object && object.password ? object.password : null;
    this.token = object && object.token ? object.token : null;
  }
}
