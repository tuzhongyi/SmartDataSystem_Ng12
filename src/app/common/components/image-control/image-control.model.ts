import { OnlineStatus } from 'src/app/enum/online-status.enum';

export class ImageControlModel {
  constructor(
    id: string,
    name: string,
    src: string,
    onerror: string,
    status: OnlineStatus = OnlineStatus.Online
  ) {
    this.id = id;
    this.name = name;
    this.src = src;
    this.onerror = onerror;
    this.status = status;
  }
  name: string;
  src: string;
  id: string;
  onerror: string;
  status: OnlineStatus;
}
