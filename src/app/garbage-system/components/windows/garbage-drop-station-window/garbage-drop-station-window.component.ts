import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/view-model/image-control.model';
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
  @Input()
  index = GarbageDropStationWindowIndex.list;
  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();

  constructor() {
    super();
  }

  Index = GarbageDropStationWindowIndex;

  ngOnInit(): void {}

  load: EventEmitter<string> = new EventEmitter();

  onsearch(text: string) {
    this.load.emit(text);
  }
  onimage(item: ImageControlModelArray) {
    this.image.emit(item);
  }

  indexChange(index: number) {
    this.index = index;
  }
}
export enum GarbageDropStationWindowIndex {
  list = 0,
  count = 1,
  details = 2,
}
