import { EventEmitter } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';

export class PlaybackConfigWindowViewModel extends WindowViewModel {
  styles = {
    width: '530px',
    height: '400px',
    top: '50%',
    left: '50%',
    transform: 'translate(-265px, -200px)',
  };

  onOkClicked = new EventEmitter();

  ok(model: Duration) {
    this.onOkClicked.emit(model);
    this.show = false;
  }

  cancel() {
    this.show = false;
  }
}
