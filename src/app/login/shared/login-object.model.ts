export class LoginObject {
  public email: string;
  public password: string;

  constructor(object?: any) {
    this.email = object && object.email ? object.email : null;
    this.password = object && object.password ? object.password : null;
  }
}
