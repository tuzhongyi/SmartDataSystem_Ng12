import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { Language } from 'src/app/common/tools/language';
import { StationType } from 'src/app/enum/station-type.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';
import { AIOPGarbageStationDetailsBusiness } from './aiop-garbage-station-details.business';
import { AIOPGarbageStationDetailsWindow } from './aiop-garbage-station-details.model';

@Component({
  selector: 'aiop-garbage-station-details',
  templateUrl: './aiop-garbage-station-details.component.html',
  styleUrls: ['./aiop-garbage-station-details.component.less'],
  providers: [AIOPGarbageStationDetailsBusiness],
})
export class AIOPGarbageStationDetailsComponent implements OnInit {
  @Input() model?: GarbageStationModel;
  @Output() ok: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  constructor(
    private business: AIOPGarbageStationDetailsBusiness,
    private toastr: ToastrService
  ) {}

  window = new AIOPGarbageStationDetailsWindow();
  StationType = StationType;
  Language = Language;
  station: GarbageStation = new GarbageStation();

  ngOnInit(): void {
    if (this.model) {
      let plain = instanceToPlain(this.model);
      this.station = plainToInstance(GarbageStation, plain);
    }
  }

  oncameradelete(camera: Camera) {
    if (this.station && this.station.Cameras) {
      let index = this.station.Cameras.findIndex((x) => x.Id === camera.Id);
      if (index >= 0) {
        this.station.Cameras.splice(index, 1);
      }
    }
    this.window.confirm.camera = camera;
    this.window.confirm.show = true;
  }

  oncamerasetting() {
    this.window.setting.model = this.station;
    this.window.setting.show = true;
  }
  check() {
    if (!this.station.Name) {
      this.toastr.warning('请填写厢房名称');
      return false;
    }
    if (this.station.StationType === undefined) {
      this.toastr.warning('请填写厢房类型');
      return false;
    }
    return true;
  }
  onok() {
    if (this.check()) {
      let promise: Promise<GarbageStation>;
      if (this.station.Id) {
        promise = this.business.update(this.station);
      } else {
        promise = this.business.create(this.station);
      }
      promise
        .then((x) => {
          this.toastr.success('操作成功');
          this.ok.emit();
        })
        .catch((error) => {
          console.error(error);
          this.toastr.error('操作失败');
        });
    }
  }

  oncancel() {
    this.cancel.emit();
  }
}
