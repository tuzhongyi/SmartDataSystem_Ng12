import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/common/components/image-control/image-control.model';
import { GarbageDropStationTableModel } from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
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
  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  onimage(item: ImageControlModelArray) {
    this.image.emit(item);
  }
}
