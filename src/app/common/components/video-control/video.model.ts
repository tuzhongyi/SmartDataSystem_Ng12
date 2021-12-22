import { HowellUrl } from 'src/app/view-model/howell-url';

export class VideoModel {
  // 链接地址
  host?: string;
  // 端口号
  port?: number;
  // 摄像机id
  deviceId?: string;
  // 通道号
  slot?: number;
  // 用户名
  username?: string;
  // 密码
  password?: string;
  // 模式
  mode?: VideoMode;
  // 开始时间
  beginTime?: Date;
  // 结束时间
  endTime?: Date;
  constructor(
    options?:
      | {
          host?: string;
          deviceId?: string;
          slot?: number;
          userName?: string;
          password?: string;
          mode?: VideoMode;
          beginTime?: Date;
          endTime?: Date;
        }
      | string
  ) {
    if (options) {
      if (typeof options === 'string') {
        this.fromString(options);
      } else {
        this.host = options.host;
        this.deviceId = options.deviceId;
        this.slot = options.slot;
        this.username = options.userName;
        this.password = options.password;
        this.mode = options.mode;
        this.beginTime = options.beginTime;
        this.endTime = options.endTime;
      }
    }
  }

  fromString(str: string) {
    let url = new HowellUrl(str);
    this.host = url.Host;
    this.port = url.Port;
    if (url.Querys) {
      this.username = url.Querys.user;
      this.password = url.Querys.password;
    }

    let uri = str.substr(str.indexOf(url.Authority) + url.Authority.length + 1);
    let nodes = uri.split('/');

    this.mode = nodes[3] as VideoMode;
    this.deviceId = nodes[4];
    this.slot = parseInt(nodes[5]);

    switch (this.mode) {
      case VideoMode.live:
        break;
      case VideoMode.vod:
        let interval = nodes[7];
        let times = interval.split('_');
        this.beginTime = new Date(times[0]);
        this.endTime = new Date(times[1]);
        break;

      default:
        break;
    }
  }

  toString() {
    let url = `ws://${this.host}:${this.port}/ws/video/howellps/${this.mode}/${this.deviceId}/${this.slot}/1/${this.mode}.mp4?user=${this.username}&password=${this.password}`;
    if (this.mode === VideoMode.vod && this.beginTime && this.endTime) {
      url = `ws://${this.host}:${this.port}/ws/video/howellps/${this.mode}/${
        this.deviceId
      }/${
        this.slot
      }/1/${this.beginTime.toISOString()}_${this.endTime.toISOString()}/${
        this.mode
      }.mp4?user=${this.username}&password=${this.password}`;
    }
    return url;
  }
}

export enum VideoMode {
  live = 'live',
  vod = 'vod',
}
