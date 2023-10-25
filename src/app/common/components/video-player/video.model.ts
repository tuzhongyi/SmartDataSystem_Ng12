import { StreamType } from 'src/app/enum/stream-type.enum';
import { HowellUrl } from 'src/app/view-model/howell-url';

export class VideoModel {
  /** 链接地址 */
  host: string = '';

  /** 端口号 */
  port: number = 80;

  /** 摄像机id */
  deviceId: string = '';

  /** 通道号 */
  slot: number = 0;
  /** 码流 */
  stream?: StreamType;
  /** 用户名 */
  username?: string;

  /** 密码 */
  password?: string;

  /** 模式 */
  mode: PlayMode = PlayMode.live;

  /** 开始时间 */
  beginTime?: Date;

  /** 结束时间 */
  endTime?: Date;

  web?: string;

  index: number = 0;

  constructor(
    options?:
      | {
          host: string;
          deviceId: string;
          slot: number;
          stream?: StreamType;
          userName?: string;
          password?: string;
          mode: PlayMode;
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
        this.stream = options.stream;
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

    this.mode = nodes[3] as PlayMode;
    this.deviceId = nodes[4];
    this.slot = parseInt(nodes[5]);
    this.stream = parseInt(nodes[6]);

    switch (this.mode) {
      case PlayMode.live:
        break;
      case PlayMode.vod:
        let interval = nodes[7];
        let times = interval.split('_');
        this.beginTime = new Date(times[0]);
        this.endTime = new Date(times[1]);
        break;

      default:
        break;
    }
  }

  toString(stream?: StreamType) {
    if (stream) {
      this.stream = stream;
    }
    if (!this.stream) {
      this.stream = StreamType.sub;
    }
    let url = `ws://${this.host}:${this.port}/ws/video/howellps/${this.mode}/${this.deviceId}/${this.slot}/${this.stream}/${this.mode}.mp4?user=${this.username}&password=${this.password}`;
    if (this.mode === PlayMode.vod && this.beginTime && this.endTime) {
      url = `ws://${this.host}:${this.port}/ws/video/howellps/${this.mode}/${
        this.deviceId
      }/${this.slot}/${
        this.stream
      }/${this.beginTime.toISOString()}_${this.endTime.toISOString()}/${
        this.mode
      }.mp4?user=${this.username}&password=${this.password}`;
    }
    return url;
  }

  static fromUrl(url: string, username?: string, password?: string) {
    let model = new VideoModel(url);
    if (username) model.username = username;
    if (password) model.password = password;
    return model;
  }
}

export enum PlayMode {
  live = 'live',
  vod = 'vod',
}
export enum VideoPlayerState {
  ready = 0,
  playing = 1,
  pause = 2,
  slow = 3,
  fast = 4,
  end = 5,
  opening = 6,
  closing = 7,
  frame = 8,
  closed = 255,
}
