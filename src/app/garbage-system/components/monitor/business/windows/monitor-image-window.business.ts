import { EventEmitter, Injectable } from '@angular/core';
import { DeviceViewModel } from 'src/app/common/components/tables/device-list-table/device.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageDropStationTableModel } from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { GarbageFullStationTableModel } from 'src/app/common/components/tables/garbage-full-station-table/garbage-full-station-table.model';
import { GarbageStationTableModel } from 'src/app/common/components/tables/garbage-station-table/garbage-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { Flags } from 'src/app/common/tools/flags';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import {
  GarbageFullEventData,
  GarbageFullEventRecord,
} from 'src/app/network/model/garbage-station/event-record/garbage-full-event-record.model';
import {
  IllegalDropEventData,
  IllegalDropEventRecord,
} from 'src/app/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import {
  MixedIntoEventData,
  MixedIntoEventRecord,
} from 'src/app/network/model/garbage-station/event-record/mixed-into-event-record.model';
import {
  SewageEventData,
  SewageEventRecord,
} from 'src/app/network/model/garbage-station/event-record/sewage-event-record.model';
import {
  ImagePagedArgs,
  PagedArgs,
} from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { MediaImageControlPageState } from '../../../media-image-control-page/media-image-control-page.model';
import { MonitorImageArrayWindowBusiness } from './monitor-image-array-window.business';

@Injectable()
export class MonitorImageWindowBusiness extends WindowViewModel {
  constructor(
    // public page: MonitorImagePageWindowBusiness,
    private array: MonitorImageArrayWindowBusiness
  ) {
    super();
  }

  clear() {
    this.page = undefined;
    this.state = undefined;
    this.array.clear();
  }

  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };

  onimgnext() {
    this.array.onnext();
  }
  onimgprev() {
    this.array.onprev();
  }
  onvideo() {
    this.array.onvideo();
  }

  get imgfirst() {
    return this.array.first;
  }

  get imglast() {
    return this.array.last;
  }

  public get captureing(): boolean {
    return this.array.captureing;
  }
  public set captureing(v: boolean) {
    this.array.captureing;
  }

  get current() {
    return this.array.current;
  }

  public get models(): ImageControlModel[] {
    return this.array.models;
  }
  public set models(v: ImageControlModel[]) {
    this.array.models = v;
  }
  public get manualcapture(): boolean {
    return this.array.manualcapture;
  }
  public set manualcapture(v: boolean) {
    this.array.manualcapture = v;
  }

  public get index(): number {
    return this.array.index;
  }
  public set index(v: number) {
    this.array.index = v;
  }

  public get stationId() {
    return this.array.stationId;
  }
  public set stationId(v: string | undefined) {
    this.array.stationId = v;
  }

  get pagefirst() {
    if (this.page) {
      return this.page.PageIndex === 1;
    }
    return undefined;
  }
  get pagelast() {
    if (this.page) {
      return this.page.PageIndex === this.page.TotalRecordCount;
    }
    return undefined;
  }
  onpageprev() {
    if (this.page) {
      this.page.PageIndex--;
      this.getData.emit(this.page);
    }
  }
  onpagenext() {
    if (this.page) {
      this.page.PageIndex++;
      this.getData.emit(this.page);
    }
  }
  page?: Page;
  getData: EventEmitter<Page> = new EventEmitter();
  gotData<T>(paged: PagedList<T>) {
    this.page = paged.Page;
    if (paged.Data && paged.Data.length > 0) {
      // if (paged.Data[0].images && paged.Data[0].images.length > 0) {
      //   this.array.models = paged.Data[0].images;
      // }
      this.clear();
      this.set({
        data: paged.Data[0],
        page: paged.Page,
        index: 0,
      } as ImagePagedArgs<T>);
    }
  }

  onpage(page: Page) {
    console.log(page);
  }

  state?: MediaImageControlPageState;

  open<T>(args: PagedArgs<T> | DeviceViewModel) {
    this.clear();
    this.set(args);
    this.show = true;
  }

  set<T>(args: PagedArgs<T> | DeviceViewModel) {
    if (args instanceof DeviceViewModel) {
      this.setFromDeviceViewModel(args);
    } else if (args.data instanceof EventRecordViewModel) {
      this.setFromEventRecordViewModel(
        args.data as any,
        args.page,
        (args as ImagePagedArgs<T>).index
      );
    } else if (args.data instanceof GarbageFullEventRecord) {
      this.setFromGarbageFullEventRecord(
        args.data,
        args.page,
        (args as ImagePagedArgs<T>).index
      );
    } else if (args.data instanceof IllegalDropEventRecord) {
      this.setFromIllegalDropEventRecord(args.data, args.page);
    } else if (args.data instanceof MixedIntoEventRecord) {
      this.setFromMixedIntoEventRecord(
        args.data,
        args.page,
        (args as ImagePagedArgs<T>).index
      );
    } else if (args.data instanceof SewageEventRecord) {
      this.setFromSewageEventRecord(
        args.data,
        args.page,
        (args as ImagePagedArgs<T>).index
      );
    } else if (args.data instanceof GarbageDropStationTableModel) {
      this.setFromGarbageDropStationTableModel(args.data, args.page.PageIndex);
    } else if (args.data instanceof GarbageFullStationTableModel) {
      this.setFromGarbageFullStationTableModel(args.data, args.page.PageIndex);
    } else if (args.data instanceof GarbageStationTableModel) {
      this.setFromGarbageStationTableModel(args.data, args.page.PageIndex);
    } else if (args.data instanceof GarbageDropRecordViewModel) {
      this.setFromGarbageDropRecordViewModel(
        args.data,
        args.page,
        (args as ImagePagedArgs<T>).index
      );
    } else if (args.data instanceof ImageControlModel) {
      this.models = [args.data];
    } else if ('EventType' in (args.data as any)) {
      this.setFromEventRecordViewModel(
        args.data as any,
        args.page,
        (args as ImagePagedArgs<T>).index
      );
    } else {
    }
  }

  private setFromEventRecordViewModel(
    data: EventRecordViewModel,
    page: Page,
    index: number = 0
  ) {
    if (
      data.Data instanceof GarbageFullEventData ||
      data.EventType === EventType.GarbageFull
    ) {
      this.setFromGarbageFullEventRecord(data, page, index);
    } else if (
      data.Data instanceof IllegalDropEventData ||
      data.EventType === EventType.IllegalDrop
    ) {
      this.setFromIllegalDropEventRecord(data, page);
    } else if (
      data.Data instanceof MixedIntoEventData ||
      data.EventType === EventType.MixedInto
    ) {
      this.setFromMixedIntoEventRecord(data, page, index);
    } else if (
      data.Data instanceof SewageEventData ||
      data.EventType === EventType.Sewage
    ) {
      this.setFromSewageEventRecord(data, page, index);
    }
  }

  private setFromGarbageFullEventRecord(
    data: GarbageFullEventRecord,
    page: Page,
    index: number
  ) {
    this.page = page;
    this.index = index;
    this.stationId = data.Data.StationId;
    if (data.Data.Processed) {
      this.state = {
        ishandle: data.Data.Processed,
        istimeout: false,
      };
    }
    this.models = ImageControlCreater.Create(data);
  }
  private setFromIllegalDropEventRecord(
    data: IllegalDropEventRecord,
    page: Page
  ) {
    this.page = page;
    this.models = [ImageControlCreater.Create(data)];
  }
  private setFromMixedIntoEventRecord(
    data: MixedIntoEventRecord,
    page: Page,
    index: number
  ) {
    this.page = page;
    this.index = index;
    if (data.Data.Processed) {
      this.state = {
        ishandle: data.Data.Processed,
        istimeout: false,
      };
    }
    this.models = ImageControlCreater.Create(data);
  }
  private setFromSewageEventRecord(
    data: SewageEventRecord,
    page: Page,
    index: number
  ) {
    this.page = page;
    this.index = index;
    if (data.Data.Processed) {
      this.state = {
        ishandle: data.Data.Processed,
        istimeout: false,
      };
    }
    this.models = ImageControlCreater.Create(data);
    console.log(this.models);
  }
  private setFromGarbageDropStationTableModel(
    data: GarbageDropStationTableModel,
    index: number
  ) {
    this.index = index;
    data.GarbageStation.then((station) => {
      this.stationId = station.Id;
      this.manualcapture = true;
      if (station.Cameras) {
        this.models = station.Cameras.map((x) => ImageControlCreater.Create(x));
      }
    });
  }
  private setFromGarbageFullStationTableModel(
    data: GarbageFullStationTableModel,
    index: number
  ) {
    this.manualcapture = true;
    this.index = index;
    data.GarbageStation.then((station) => {
      this.stationId = station.Id;
      if (station.Cameras) {
        this.models = station.Cameras.filter((x) => {
          let flags = new Flags(x.CameraUsage);
          return flags.contains(CameraUsage.GarbageFull);
        }).map((x) => ImageControlCreater.Create(x));
      }
    });
  }
  private setFromGarbageStationTableModel(
    data: GarbageStationTableModel,
    index: number
  ) {
    this.manualcapture = true;
    this.index = index;
    this.stationId = data.GarbageStation.Id;
    if (data.GarbageStation.Cameras) {
      this.models = data.GarbageStation.Cameras.map((x) =>
        ImageControlCreater.Create(x)
      );
    }
  }
  private setFromDeviceViewModel(data: DeviceViewModel) {
    this.stationId = data.GarbageStationId;
    this.manualcapture = true;
    this.models = [ImageControlCreater.Create(data)];
  }
  private setFromGarbageDropRecordViewModel(
    data: GarbageDropRecordViewModel,
    page: Page,
    index: number
  ) {
    this.page = page;
    this.index = index;
    this.stationId = data.Data.StationId;
    this.state = {
      ishandle: data.Data.IsHandle,
      istimeout: data.Data.IsTimeout || data.Data.IsSuperTimeout,
    };
    this.models = ImageControlCreater.Create(data);
  }
}
