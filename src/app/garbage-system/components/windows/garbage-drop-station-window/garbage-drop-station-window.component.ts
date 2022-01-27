import { Component, EventEmitter, OnInit } from '@angular/core';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

@Component({
  selector: 'howell-garbage-drop-station-window',
  templateUrl: './garbage-drop-station-window.component.html',
  styleUrls: ['./garbage-drop-station-window.component.less'],
})
export class GarbageDropStationWindowComponent
  extends WindowComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {}

  load: EventEmitter<string> = new EventEmitter();

  onsearch(text: string) {
    this.load.emit(text);
  }
}
