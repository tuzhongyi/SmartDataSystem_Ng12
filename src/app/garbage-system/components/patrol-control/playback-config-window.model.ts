import { EventEmitter } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';

export class PlaybackConfigWindowViewModel extends WindowViewModel {
  styles = {
    width: '530px',
    height: '400px',
    top: '50%',
    left: '50%',
    transform: 'translate(-265px, -200px)',
  };

  onOkClicked = new EventEmitter();

  ok(model: DurationParams) {
    this.onOkClicked.emit(model);
    this.show = false;
  }

  cancel() {
    this.show = false;
  }
}
