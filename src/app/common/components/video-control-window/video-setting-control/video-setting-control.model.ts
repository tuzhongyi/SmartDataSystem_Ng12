export class VideoSettingControlViewModel {
  clickTag = false;
  isFillVideo = false;
  recordFilePage = {
    index: 1,
    beginTime: '',
    endTime: '',
    list: new Array(),
  };
  PTZ = {
    direction: DirectionState,
    reset: RresetState,
    len: LensState,
    speed: 4,
    presetControl: new Array(),
  };
  scroll = {
    // 滚动条组件参数
    throttle: 300,
    scrollDistance: 1,
    scrollUpDistance: 2,
    scrollWindow: false,
  };
}

export enum DirectionState {
  stop,
  up,
  down,
  left,
  right,
  up_left,
  up_right,
  down_left,
  down_right,
}

export enum LensState {
  stop,
  halo_on,
  halo_off,
  zoom_in,
  zoom_out,
  far,
  unfar,
}

export enum RresetState {
  clear,
  set,
  do,
}
