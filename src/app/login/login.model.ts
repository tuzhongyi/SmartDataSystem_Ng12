export class LoginModel {
  username: string = '';
  password: string = '';

  private _save: boolean = false;
  public get save(): boolean {
    return this._save;
  }
  public set save(v: boolean) {
    this._save = v;
    if (!this._save) {
      this.auto = false;
    }
  }

  private _auto: boolean = false;
  public get auto(): boolean {
    return this._auto;
  }
  public set auto(v: boolean) {
    this._auto = v;
    if (this._auto) {
      this.save = true;
    }
  }
}
