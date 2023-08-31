import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { GarbageStationEventRecordVisionModel } from 'src/app/common/components/tables/garbage-station-event-record-vision-table/garbage-station-event-record-vision-table.model';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';
import { SupervisePosition } from './dapuqiao-main-event-vision.model';

@Component({
  selector: 'dapuqiao-main-event-vision',
  templateUrl: './dapuqiao-main-event-vision.component.html',
  styleUrls: ['./dapuqiao-main-event-vision.component.less'],
})
export class DaPuQiaoMainEventVisionComponent implements OnInit, OnChanges {
  @Input() load?: EventEmitter<void>;
  @Input() position?: SupervisePosition = SupervisePosition.center;
  @Output() positionChange = new EventEmitter<SupervisePosition>();
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() image: EventEmitter<GarbageStationEventRecordVisionModel> =
    new EventEmitter();
  @Output() details: EventEmitter<GarbageStationEventRecordVisionModel> =
    new EventEmitter();
  @Output() select: EventEmitter<GarbageStationEventRecordVisionModel> =
    new EventEmitter();
  constructor(
    private service: UserRequestService,
    private local: LocalStorageService
  ) {}

  Position = SupervisePosition;

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['position']) {
      if (this.position) {
        this.update();
      }
    }
  }

  async init() {
    let str = await this.service.config.get(
      this.local.user.Id,
      UserConfigType.SupervisePosition
    );
    if (str) {
      this.position = JSON.parse(str) as SupervisePosition;
    } else {
      this.position = SupervisePosition.center;
      this.service.config.update(
        this.local.user.Id,
        UserConfigType.SupervisePosition,
        this.position.toString()
      );
    }
    this.positionChange.emit(this.position);
  }

  update() {
    if (this.position) {
      this.service.config.update(
        this.local.user.Id,
        UserConfigType.SupervisePosition,
        this.position.toString()
      );
    }
  }

  onchange() {
    this.update();
    this.positionChange.emit(this.position);
  }
  onclose() {
    this.close.emit();
  }
  onimage(item: GarbageStationEventRecordVisionModel) {
    this.image.emit(item);
  }
  ondetails(item: GarbageStationEventRecordVisionModel) {
    this.details.emit(item);
  }
  onselect(item: GarbageStationEventRecordVisionModel) {
    this.select.emit(item);
  }
}
