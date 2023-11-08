import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AiopCameraTableArgs } from 'src/app/common/components/tables/aiop-camera-table/aiop-camera-table.model';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AICameraModel } from 'src/app/view-model/ai-camera.model';
import { AIOPGarbageStationDetailsCamerasBusiness } from './aiop-garbage-station-details-cameras.business';
import { AIOPGarbageStationDetailsCamerasService } from './aiop-garbage-station-details-cameras.service';

@Component({
  selector: 'aiop-garbage-station-details-cameras',
  templateUrl: './aiop-garbage-station-details-cameras.component.html',
  styleUrls: ['./aiop-garbage-station-details-cameras.component.less'],
  providers: [
    AIOPGarbageStationDetailsCamerasService,
    AIOPGarbageStationDetailsCamerasBusiness,
  ],
})
export class AIOPGarbageStationDetailsCamerasComponent implements OnInit {
  @Input() model?: GarbageStation;
  @Output() modelChange: EventEmitter<GarbageStation> = new EventEmitter();
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private business: AIOPGarbageStationDetailsCamerasBusiness,
    private toastr: ToastrService
  ) {}

  args = new AiopCameraTableArgs();
  load = new EventEmitter<AiopCameraTableArgs>();
  selected: Map<string, AICameraModel> = new Map();
  all?: AICameraModel[];

  ngOnInit(): void {
    if (this.model && this.model.Cameras) {
      let ids = this.model.Cameras.map((x) => x.Id);
      this.business.load(ids).then((cameras) => {
        this.selected.clear();
        for (let i = 0; i < cameras.length; i++) {
          const camera = cameras[i];
          this.selected.set(camera.Id, camera);
        }
        this.selected.values();
      });
    }
  }

  onsearch(name: string) {
    this.args.name = name;
    this.load.emit(this.args);
  }

  onloaded(datas: AICameraModel[]) {
    if (!this.all) {
      this.all = datas;
    }
  }

  onremove(item: AICameraModel) {
    this.selected.delete(item.Id);
  }
  async onok() {
    if (this.model) {
      let toremove: Camera[] = [];
      let tocreate: AICamera[] = [];
      if (this.model.Cameras) {
        for (let i = 0; i < this.model.Cameras.length; i++) {
          const camera = this.model.Cameras[i];
          if (!this.selected.has(camera.Id)) {
            toremove.push(camera);
          }
        }
        this.selected.forEach((camera) => {
          let index = this.model!.Cameras!.findIndex((x) => x.Id === camera.Id);
          if (index < 0) {
            tocreate.push(camera);
          }
        });
      }

      try {
        if (toremove.length > 0) {
          this.model = await this.business.remove(
            this.model,
            toremove.map((x) => x.Id)
          );
          this.modelChange.emit(this.model);
        }
        if (tocreate.length > 0) {
          this.model = await this.business.create(this.model, tocreate);
          this.modelChange.emit(this.model);
        }

        this.close.emit(true);
      } catch (error) {
        console.error(error);
        this.toastr.error('操作失败');
      }
    }
  }
  oncancel() {
    this.close.emit(false);
  }
}
