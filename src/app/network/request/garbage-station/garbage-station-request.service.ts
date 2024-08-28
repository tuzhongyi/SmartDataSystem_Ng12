/*
 * @Author: zzl
 * @Date: 2021-09-16 10:05:08
 * @Last Modified by: zzl
 * @Last Modified time: 2021-12-14 14:36:27
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractService } from 'src/app/business/Ibusiness';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { CameraPictureUrl } from '../../model/url.model';
import { GarbageStationUrl } from '../../url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { Cache } from '../cache/cache';
import { ExcelService } from '../excel.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GarbageStationAbnormalRequestService } from './abnormal/garbage-station-abnormal-request.service';
import { GarbageStationCameraRequestService } from './camera/garbage-station-camera-request.service';
import { GarbageStationDeviceRequestService } from './device/garbage-station-device-request.service';
import { GarbageStationEventNumberRequestService } from './event-number/garbage-station-event-number-request.service';
import { GetGarbageStationsParams } from './garbage-station-request.params';
import { GarbageStationMumberRequestService } from './member/garbage-station-member-request.service';
import { GarbageStationNBBoxRequestService } from './nb-box/garbage-station-nb-box.request.service';
import { GarbageStationStatisticRequestService } from './statistic/garbage-station-statistic-request.service';
import { GarbageStationTaskRequestService } from './task/garbage-station-task-request.service';
import { GarbageStationTrashCanRequestService } from './trash-can/garbage-station-trash-can-request.service';
import { GarbageStationTypeRequestService } from './type/garbage-station-type-request.service';
import { GarbageStationVolumeRequestService } from './volume/garbage-station-volume-request.service';

@Injectable({
  providedIn: 'root',
})
@Cache(GarbageStationUrl.basic(), GarbageStation)
export class GarbageStationRequestService extends AbstractService<GarbageStation> {
  constructor(private http: HowellAuthHttpService, router: Router) {
    super();
    this.basic = new HowellBaseRequestService(http, router);
    this.typeBasic = this.basic.type(GarbageStation);
  }

  private basic: HowellBaseRequestService;
  private typeBasic: HowellBaseTypeRequestService<GarbageStation>;

  get(id: string): Promise<GarbageStation> {
    let url = GarbageStationUrl.item(id);
    return this.typeBasic.get(url);
  }
  update(data: GarbageStation): Promise<GarbageStation> {
    let url = GarbageStationUrl.item(data.Id);
    return this.typeBasic.put(url, data);
  }
  create(data: GarbageStation): Promise<GarbageStation> {
    let url = GarbageStationUrl.basic();
    return this.typeBasic.post(url, data);
  }
  delete(id: string): Promise<GarbageStation> {
    let url = GarbageStationUrl.item(id);
    return this.typeBasic.delete(url);
  }
  list(
    params: GetGarbageStationsParams = new GetGarbageStationsParams()
  ): Promise<PagedList<GarbageStation>> {
    let url = GarbageStationUrl.list();
    return this.typeBasic.paged(url, params);
  }

  manualCapture(stationId: string): Promise<CameraPictureUrl[]> {
    let url = GarbageStationUrl.manualcapture(stationId);
    return this.basic.postArray(url, CameraPictureUrl);
  }

  private _camera?: GarbageStationCameraRequestService;
  public get camera(): GarbageStationCameraRequestService {
    if (!this._camera) {
      this._camera = new GarbageStationCameraRequestService(this.basic);
    }
    return this._camera;
  }

  private _trashCan?: GarbageStationTrashCanRequestService;
  public get trashCan(): GarbageStationTrashCanRequestService {
    if (!this._trashCan) {
      this._trashCan = new GarbageStationTrashCanRequestService(this.basic);
    }
    return this._trashCan;
  }

  private _volume?: GarbageStationVolumeRequestService;
  public get volume(): GarbageStationVolumeRequestService {
    if (!this._volume) {
      this._volume = new GarbageStationVolumeRequestService(this.basic);
    }
    return this._volume;
  }

  private _eventNumber?: GarbageStationEventNumberRequestService;
  public get eventNumber(): GarbageStationEventNumberRequestService {
    if (!this._eventNumber) {
      this._eventNumber = new GarbageStationEventNumberRequestService(
        this.basic
      );
    }
    return this._eventNumber;
  }

  private _type?: GarbageStationTypeRequestService;
  public get type(): GarbageStationTypeRequestService {
    if (!this._type) {
      this._type = new GarbageStationTypeRequestService(this.basic);
    }
    return this._type;
  }
  private _mumber?: GarbageStationMumberRequestService;
  public get mumber(): GarbageStationMumberRequestService {
    if (!this._mumber) {
      this._mumber = new GarbageStationMumberRequestService(this.basic);
    }
    return this._mumber;
  }
  private _task?: GarbageStationTaskRequestService;
  public get task(): GarbageStationTaskRequestService {
    if (!this._task) {
      this._task = new GarbageStationTaskRequestService(this.basic);
    }
    return this._task;
  }
  private _statistic?: GarbageStationStatisticRequestService;
  public get statistic(): GarbageStationStatisticRequestService {
    if (!this._statistic) {
      this._statistic = new GarbageStationStatisticRequestService(this.basic);
    }
    return this._statistic;
  }

  private _device?: GarbageStationDeviceRequestService;
  public get device(): GarbageStationDeviceRequestService {
    if (!this._device) {
      this._device = new GarbageStationDeviceRequestService(this.basic);
    }
    return this._device;
  }

  excel = new ExcelService(this.http, GarbageStationUrl.excels());

  private _nb?: { box: GarbageStationNBBoxRequestService };
  public get nb(): { box: GarbageStationNBBoxRequestService } {
    if (!this._nb) {
      this._nb = {
        box: new GarbageStationNBBoxRequestService(this.basic),
      };
    }
    return this._nb;
  }

  private _abnormal?: GarbageStationAbnormalRequestService;
  public get abnormal(): GarbageStationAbnormalRequestService {
    if (!this._abnormal) {
      this._abnormal = new GarbageStationAbnormalRequestService(this.basic);
    }
    return this._abnormal;
  }
}
