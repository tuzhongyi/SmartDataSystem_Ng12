// declare var base64encode: (str: string) => string;
// declare var utf16to8: (str: string) => string;
declare class WSPlayerProxy {
  constructor(iframe: string | HTMLIFrameElement);
  /** 全屏状态 */
  FullScreen: boolean;
  download(filename: string, type: string): void;
  resize(width: number, height: number): void;
  fullScreen(): void;
  stop(): Promise<void>;
  frame(): void;
  resume(): void;
  speedResume(): void;
  pause(): void;
  capturePicture(): void;
  slow(): void;
  fast(): void;
  changeRuleState(state: boolean): void;
  seek(value: number): void;
  onStoping: (index: number) => void;
  onPlaying: (index: number) => void;
  /** 获取已播放未知 */
  getPosition: (index: number, value: number) => void;
  onButtonClicked: (index: number, btn: ButtonName) => void;
  /** 双击全屏 返回值：是否触发全屏 */
  onViewerDoubleClicked: (index: number) => void;
  onViewerClicked: (index: number) => void;
  onRuleStateChanged: (index: number, state: boolean) => void;
  onStatusChanged: (index: number, state: PlayerState) => void;
  destory: () => void;
}

declare enum ButtonName {
  /** 播放 */
  play = 'play',
  /** 恢复 */
  resume = 'resume',
  /** 暂停 */
  pause = 'pause',
  /** 停止 */
  stop = 'stop',
  /** 全屏 */
  fullscreen = 'fullscreen',
  /** 截图 */
  capturepicture = 'capturepicture',
  /** 慢放 */
  slow = 'slow',
  /** 快放 */
  fast = 'fast',
  /** 单帧 */
  forward = 'forward',
  /** 回跳 */
  jump_back = 'jump_back',
  /** 跳进 */
  jump_forward = 'jump_forward',
}
declare enum PlayerState {
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
