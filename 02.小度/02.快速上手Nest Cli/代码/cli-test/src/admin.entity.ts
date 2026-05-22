export class Admin {
  constructor(
    private id: string,
    private name: string,
    private password: string,
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
}
