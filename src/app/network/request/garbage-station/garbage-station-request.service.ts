/*
 * @Author: zzl
 * @Date: 2021-09-16 10:05:08
 * @Last Modified by: zzl
 * @Last Modified time: 2021-12-14 14:36:27
 */
import { Injectable } from '@angular/core';
import { instanceToPlain } from 'class-transformer';
import { AbstractService } from 'src/app/business/Ibusiness';
import {
  GarbageStation,
  GarbageStationType,
} from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { Camera } from '../../model/camera.model';
import { EventNumberStatistic } from '../../model/event-number-statistic.model';
import { GarbageStationNumberStatisticComparison } from '../../model/garbage-station-number-statistic-comparison.model';
import { GarbageStationNumberStatisticV2 } from '../../model/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from '../../model/garbage-station-number-statistic.model';
import { GarbageStationGarbageCountStatistic } from '../../model/garbage-station-sarbage-count-statistic.model';
import { GarbageTask } from '../../model/garbage-task.model';
import { GarbageVolume } from '../../model/garbage-volume.model';
import { Member } from '../../model/member.model';
import { SumEventNumber } from '../../model/sum-event-number.model';
import { TrashCan } from '../../model/trash-can.model';
import { CameraPictureUrl, RecordFileUrl } from '../../model/url.model';
import { GarbageStationUrl } from '../../url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { Cache } from '../cache/cache';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import {
  CameraDownloadFileParams,
  CameraUploadFileParams,
  FinishTaskParams,
  GetGarbageStationCamerasParams,
  GetGarbageStationsParams,
  GetGarbageStationStatisticComparisonParams,
  GetGarbageStationStatisticGarbageCountsParams,
  GetGarbageStationStatisticNumbersParams,
  GetGarbageStationStatisticNumbersParamsV2,
  GetGarbageStationSumEventNumberParams,
  GetGarbageStationTrashCansParams,
  GetGarbageStationVolumesParams,
} from './garbage-station-request.params';

@Injectable({
  providedIn: 'root',
})
@Cache(GarbageStationUrl.basic(), GarbageStation)
export class GarbageStationRequestService extends AbstractService<GarbageStation> {
  constructor(_http: HowellAuthHttpService) {
    super();
    this.basic = new HowellBaseRequestService(_http);
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

  private _camera?: CamerasService;
  public get camera(): CamerasService {
    if (!this._camera) {
      this._camera = new CamerasService(this.basic);
    }
    return this._camera;
  }

  private _trashCan?: TrashCansService;
  public get trashCan(): TrashCansService {
    if (!this._trashCan) {
      this._trashCan = new TrashCansService(this.basic);
    }
    return this._trashCan;
  }

  private _volume?: VolumesService;
  public get volume(): VolumesService {
    if (!this._volume) {
      this._volume = new VolumesService(this.basic);
    }
    return this._volume;
  }

  private _eventNumber?: EventNumbersService;
  public get eventNumber(): EventNumbersService {
    if (!this._eventNumber) {
      this._eventNumber = new EventNumbersService(this.basic);
    }
    return this._eventNumber;
  }

  private _type?: TypesService;
  public get type(): TypesService {
    if (!this._type) {
      this._type = new TypesService(this.basic);
    }
    return this._type;
  }
  private _mumber?: MumberService;
  public get mumber(): MumberService {
    if (!this._mumber) {
      this._mumber = new MumberService(this.basic);
    }
    return this._mumber;
  }
  private _task?: TaskService;
  public get task(): TaskService {
    if (!this._task) {
      this._task = new TaskService(this.basic);
    }
    return this._task;
  }
  private _statistic?: StatisticService;
  public get statistic(): StatisticService {
    if (!this._statistic) {
      this._statistic = new StatisticService(this.basic);
    }
    return this._statistic;
  }
}

class CamerasService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(Camera);
  }

  private basicType: HowellBaseTypeRequestService<Camera>;
  all(stationId: string): Promise<Camera[]> {
    let url = GarbageStationUrl.camera(stationId).basic();
    return this.basicType.getArray(url);
  }
  create(camera: Camera): Promise<Camera> {
    let url = GarbageStationUrl.camera(camera.GarbageStationId).basic();
    return this.basicType.post(url, camera);
  }
  get(stationId: string, cameraId: string): Promise<Camera> {
    let url = GarbageStationUrl.camera(stationId).item(cameraId);
    return this.basicType.get(url);
  }
  update(camera: Camera): Promise<Camera> {
    let url = GarbageStationUrl.camera(camera.GarbageStationId).item(camera.Id);
    return this.basicType.put(url, camera);
  }
  delete(stationId: string, cameraId: string): Promise<Camera> {
    let url = GarbageStationUrl.camera(stationId).item(cameraId);
    return this.basicType.delete(url);
  }
  list(
    params: GetGarbageStationCamerasParams = new GetGarbageStationCamerasParams(),
    stationId?: string
  ): Promise<PagedList<Camera>> {
    let url = GarbageStationUrl.camera(stationId).list();
    return this.basicType.paged(url, params);
  }

  private _trasCan?: CamerasTrashCansService;
  public get trasCan(): CamerasTrashCansService {
    if (!this._trasCan) {
      this._trasCan = new CamerasTrashCansService(this.basic);
    }
    return this._trasCan;
  }

  private _file?: CamerasFilesService;
  public get file(): CamerasFilesService {
    if (!this._file) {
      this._file = new CamerasFilesService(this.basic);
    }
    return this._file;
  }
}
class CamerasTrashCansService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(TrashCan);
  }

  private basicType: HowellBaseTypeRequestService<TrashCan>;
  all(stationId: string, cameraId: string): Promise<TrashCan[]> {
    let url = GarbageStationUrl.camera(stationId).trashcan(cameraId).basic();
    return this.basicType.getArray(url);
  }
  create(data: TrashCan): Promise<TrashCan> {
    let url = GarbageStationUrl.camera(data.GarbageStationId)
      .trashcan(data.CameraId!)
      .basic();
    return this.basicType.post(url, data);
  }

  get(
    stationId: string,
    cameraId: string,
    trashCanId: string
  ): Promise<TrashCan> {
    let url = GarbageStationUrl.camera(stationId)
      .trashcan(cameraId)
      .item(trashCanId);
    return this.basicType.get(url);
  }
  delete(
    stationId: string,
    cameraId: string,
    trashCanId: string
  ): Promise<TrashCan> {
    let url = GarbageStationUrl.camera(stationId)
      .trashcan(cameraId)
      .item(trashCanId);
    return this.basicType.delete(url);
  }
}
class CamerasFilesService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = this.basic.type(RecordFileUrl);
  }

  private basicType: HowellBaseTypeRequestService<RecordFileUrl>;
  async download(
    params: CameraDownloadFileParams
    // percent: (percent: number) => void,
    // completely: (completely: boolean) => void
  ): Promise<RecordFileUrl> {
    let data = instanceToPlain(params);
    let url = GarbageStationUrl.camera(params.GarbageStationId).files(
      params.CameraId,
      data.BeginTime,
      data.EndTime
    );
    return await this.basic.post(url, RecordFileUrl, params);

    // this.basic.http.downloadFile(url, percent, completely);
  }
  upload(params: CameraUploadFileParams): Promise<RecordFileUrl> {
    let data = instanceToPlain(params);
    let url = GarbageStationUrl.camera(params.GarbageStationId).files(
      params.CameraId,
      data.BeginTime,
      data.EndTime
    );
    return this.basicType.post(url);
  }
}
class TrashCansService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(TrashCan);
  }

  private basicType: HowellBaseTypeRequestService<TrashCan>;

  all(stationId: string): Promise<TrashCan[]> {
    let url = GarbageStationUrl.trashcan(stationId).basic();
    return this.basicType.getArray(url);
  }
  create(data: TrashCan): Promise<TrashCan> {
    let url = GarbageStationUrl.trashcan(data.GarbageStationId).basic();
    return this.basicType.post(url, data);
  }
  get(stationId: string, trashCanId: string): Promise<TrashCan> {
    let url = GarbageStationUrl.trashcan(stationId).item(trashCanId);
    return this.basicType.get(url);
  }
  update(data: TrashCan): Promise<TrashCan> {
    let url = GarbageStationUrl.trashcan(data.GarbageStationId).item(data.Id);
    return this.basicType.put(url, data);
  }
  delete(stationId: string, trashCanId: string): Promise<TrashCan> {
    let url = GarbageStationUrl.trashcan(stationId).item(trashCanId);
    return this.basicType.delete(url);
  }
  list(params: GetGarbageStationTrashCansParams): Promise<PagedList<TrashCan>> {
    let url = GarbageStationUrl.trashcan().list();
    return this.basicType.paged(url, params);
  }
}
class VolumesService {
  constructor(private basic: HowellBaseRequestService) {}

  private _history?: VolumesHistoryService;
  public get history(): VolumesHistoryService {
    if (!this._history) {
      this._history = new VolumesHistoryService(this.basic);
    }
    return this._history;
  }
}
class VolumesHistoryService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(GarbageVolume);
  }
  private basicType: HowellBaseTypeRequestService<GarbageVolume>;
  list(
    stationId: string,
    params: GetGarbageStationVolumesParams
  ): Promise<PagedList<GarbageVolume>> {
    let url = GarbageStationUrl.volume(stationId).history.list();
    return this.basicType.paged(url, params);
  }
}
class EventNumbersService {
  constructor(private basic: HowellBaseRequestService) {}
  private _history?: EventNumbersHistoryService;
  public get history(): EventNumbersHistoryService {
    if (!this._history) {
      this._history = new EventNumbersHistoryService(this.basic);
    }
    return this._history;
  }
}
class EventNumbersHistoryService {
  constructor(basic: HowellBaseRequestService) {
    this.basicType = basic.type(EventNumberStatistic);
  }
  private basicType: HowellBaseTypeRequestService<EventNumberStatistic>;
  list(
    stationId: string,
    params: GetGarbageStationVolumesParams
  ): Promise<PagedList<EventNumberStatistic>> {
    let url = GarbageStationUrl.eventnumber(stationId).history.list();
    return this.basicType.paged(url, params);
  }
}
class StatisticService {
  constructor(private basic: HowellBaseRequestService) {}

  private _number?: StatisticNumberService;
  public get number(): StatisticNumberService {
    if (!this._number) {
      this._number = new StatisticNumberService(this.basic);
    }
    return this._number;
  }

  private _garbageCount?: StatistictGarbageCountService;
  public get garbageCount(): StatistictGarbageCountService {
    if (!this._garbageCount) {
      this._garbageCount = new StatistictGarbageCountService(this.basic);
    }
    return this._garbageCount;
  }
}
@Cache(
  GarbageStationUrl.statistic().number.basic(),
  GarbageStationNumberStatistic
)
class StatisticNumberService extends AbstractService<GarbageStationNumberStatistic> {
  constructor(private basic: HowellBaseRequestService) {
    super();
    this.basicType = basic.type(GarbageStationNumberStatistic);
  }
  private basicType: HowellBaseTypeRequestService<GarbageStationNumberStatistic>;
  get(stationId: string): Promise<GarbageStationNumberStatistic> {
    let url = GarbageStationUrl.statistic(stationId).number.basic();
    return this.basicType.get(url);
  }
  list(
    params: GetGarbageStationStatisticNumbersParams
  ): Promise<PagedList<GarbageStationNumberStatistic>> {
    let url = GarbageStationUrl.statistic().number.list();
    return this.basicType.paged(url, params);
  }
  sum(
    params: GetGarbageStationSumEventNumberParams
  ): Promise<SumEventNumber[]> {
    let url = GarbageStationUrl.statistic().number.sum();
    return this.basic.postArray(url, SumEventNumber, params);
  }
  comparison(
    params: GetGarbageStationStatisticComparisonParams
  ): Promise<GarbageStationNumberStatisticComparison[]> {
    let url = GarbageStationUrl.statistic().number.comparison();
    return this.basic.postArray(
      url,
      GarbageStationNumberStatisticComparison,
      params
    );
  }

  private _history?: StatisticNumberHistoryService;
  public get history(): StatisticNumberHistoryService {
    if (!this._history) {
      this._history = new StatisticNumberHistoryService(this.basic);
    }
    return this._history;
  }
}
class StatisticNumberHistoryService {
  constructor(basic: HowellBaseRequestService) {
    this.basicType = basic.type(GarbageStationNumberStatisticV2);
  }
  private basicType: HowellBaseTypeRequestService<GarbageStationNumberStatisticV2>;
  list(
    params: GetGarbageStationStatisticNumbersParamsV2
  ): Promise<GarbageStationNumberStatisticV2[]> {
    let url = GarbageStationUrl.statistic().number.history.list();
    return this.basicType.postArray(url, params);
  }
}
class StatistictGarbageCountService {
  constructor(private basic: HowellBaseRequestService) {}
  private _history?: StatistictGarbageCountHistoryService;
  public get history(): StatistictGarbageCountHistoryService {
    if (!this._history) {
      this._history = new StatistictGarbageCountHistoryService(this.basic);
    }
    return this._history;
  }
}
class StatistictGarbageCountHistoryService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(GarbageStationGarbageCountStatistic);
  }
  private basicType: HowellBaseTypeRequestService<GarbageStationGarbageCountStatistic>;
  list(
    params: GetGarbageStationStatisticGarbageCountsParams
  ): Promise<GarbageStationGarbageCountStatistic[]> {
    let url = GarbageStationUrl.statistic().garbagecount.history.list();
    return this.basicType.postArray(url, params);
  }
}
class TypesService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(GarbageStationType);
  }
  private basicType: HowellBaseTypeRequestService<GarbageStationType>;
  list(): Promise<GarbageStationType[]> {
    let url = GarbageStationUrl.type.basic();
    return this.basicType.getArray(url);
  }
  create(type: GarbageStationType): Promise<GarbageStationType> {
    let url = GarbageStationUrl.type.basic();
    return this.basicType.post(url, type);
  }
  get(type: number): Promise<GarbageStationType> {
    let url = GarbageStationUrl.type.item(type);
    return this.basicType.get(url);
  }
  update(type: GarbageStationType): Promise<GarbageStationType> {
    let url = GarbageStationUrl.type.item(type.Type);
    return this.basicType.put(url, type);
  }
  delete(type: number): Promise<GarbageStationType> {
    let url = GarbageStationUrl.type.item(type);
    return this.basicType.delete(url);
  }
}
class MumberService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(Member);
  }
  private basicType: HowellBaseTypeRequestService<Member>;
  all(stationId: string): Promise<Member[]> {
    let url = GarbageStationUrl.member(stationId).basic();
    return this.basicType.getArray(url);
  }
  get(stationId: string, memberId: string): Promise<Member> {
    let url = GarbageStationUrl.member(stationId).item(memberId);
    return this.basicType.get(url);
  }
  create(stationId: string, member: Member): Promise<Member> {
    let url = GarbageStationUrl.member(stationId).item(member.Id);
    return this.basicType.post(url, member);
  }
  delete(stationId: string, memberId: string): Promise<Member> {
    let url = GarbageStationUrl.member(stationId).item(memberId);
    return this.basicType.delete(url);
  }
}

class TaskService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(GarbageTask);
  }
  private basicType: HowellBaseTypeRequestService<GarbageTask>;
  finish(
    stationId: string,
    taskId: string,
    params: FinishTaskParams
  ): Promise<GarbageTask> {
    let url = GarbageStationUrl.task(stationId).finish(taskId);
    return this.basicType.post(url, params);
  }
}
