import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  ImageControlModelArray,
} from 'src/app/view-model/image-control.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventRecordOperationFilterBusiness } from '../event-record-operation-filter.business';
import { GarbageFullStationWindowRecordBusiness } from './business/garbage-full-station-window-record.business';
import { GarbageFullStationWindowStationBusiness } from './business/garbage-full-station-window-station.business';

@Component({
  selector: 'howell-garbage-full-station-window',
  templateUrl: './garbage-full-station-window.component.html',
  styleUrls: ['./garbage-full-station-window.component.less'],
  providers: [
    GarbageFullStationWindowStationBusiness,
    EventRecordOperationFilterBusiness,
    GarbageFullStationWindowRecordBusiness,
  ],
})
export class GarbageFullStationWindowComponent
  extends WindowComponent
  implements OnInit
{
  Index = GarbageFullStationWindowIndex;

  type = EventType.GarbageFull;
  constructor(
    public station: GarbageFullStationWindowStationBusiness,
    public record: GarbageFullStationWindowRecordBusiness
  ) {
    super();
  }

  index = GarbageFullStationWindowIndex.station;

  ngOnInit(): void {}

  indexChange(index: number) {
    this.index = index;
  }

  showfilter() {}

  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  onimage(item: ImageControlModelArray) {
    this.image.emit(item);
  }
}
export enum GarbageFullStationWindowIndex {
  station = 0,
  record = 1,
}
