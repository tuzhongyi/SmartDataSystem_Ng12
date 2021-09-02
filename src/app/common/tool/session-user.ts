import { Md5 } from 'ts-md5';

export class SessionUser {
  get suffix() {
    return Md5.hashStr('&*^').toString();
  }

  set name(val: string) {
    if (val == '') localStorage.removeItem('name');
    else localStorage.setItem('name', val + this.suffix);
  }

  get name() {
    const n = localStorage.getItem('name');
    return n ? n.split(this.suffix)[0] : '';
  }

  set pwd(val: string) {
    if (val == '') localStorage.removeItem('pwd');
    else localStorage.setItem('pwd', val + this.suffix);
  }

  get pwd() {
    const n = localStorage.getItem('pwd');
    return n ? n.split(this.suffix)[0] : '';
  }
}
