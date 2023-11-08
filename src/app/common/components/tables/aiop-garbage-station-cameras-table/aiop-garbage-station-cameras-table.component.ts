import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';

@Component({
  selector: 'aiop-garbage-station-cameras-table',
  templateUrl: './aiop-garbage-station-cameras-table.component.html',
  styleUrls: ['./aiop-garbage-station-cameras-table.component.less'],
})
export class AIOPGarbageStationCamerasTableComponent implements OnInit {
  @Input() cameras?: Camera[] = [];
  @Output() delete: EventEmitter<Camera> = new EventEmitter();
  constructor() {}

  Language = Language;
  widths = [undefined, '40%', undefined, '30%'];
  selected?: Camera;

  ngOnInit(): void {}

  onselect(e: Event, item: Camera) {
    this.selected = item;
  }
  ondelete(item: Camera) {
    this.delete.emit(item);
  }
}
