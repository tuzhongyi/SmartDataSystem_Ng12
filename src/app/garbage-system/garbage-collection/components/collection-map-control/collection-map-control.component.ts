import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { ImageControlArrayConverter } from 'src/app/converter/image-control-array.converter';
import {
  PointInfoPanelModelOption,
  PointInfoPanelModelOptionCommand,
} from 'src/app/garbage-system/components/map-control-point-info-panel/map-point-info-panel.model';
import { ICamera } from 'src/app/network/model/garbage-station/camera.interface';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { IModel } from 'src/app/network/model/model.interface';
import { ChangeControlModel } from 'src/app/view-model/change-control.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { CollectionMapControlBusiness } from './business/collection-map-control.business';
import { GarbageVehiclePointInfoPanelBusiness } from './business/point-info-panel.business';
import { CollectionMapControlWindow } from './collection-map-control.model';
declare var $: any;
@Component({
  selector: 'collection-map-control',
  templateUrl: './collection-map-control.component.html',
  styleUrls: [
    '../../../../../assets/less/confirm.less',
    './collection-map-control.component.less',
  ],
  providers: [
    CollectionMapControlBusiness,
    GarbageVehiclePointInfoPanelBusiness,
  ],
})
export class CollectionMapControlComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  //#region Output
  @Output()
  VideoPlay: EventEmitter<ICamera> = new EventEmitter();
  @Output()
  patrol: EventEmitter<void> = new EventEmitter();
  // 垃圾落地记录
  @Output()
  illegalDropClicked: EventEmitter<GarbageVehicle> = new EventEmitter();
  // 混合投放记录
  @Output()
  mixedIntoClicked: EventEmitter<GarbageVehicle> = new EventEmitter();
  // 小包垃圾滞留
  @Output()
  garbageCountClicked: EventEmitter<GarbageVehicle> = new EventEmitter();
  // 垃圾滞留投放点
  @Output()
  garbageRetentionClicked: EventEmitter<GarbageVehicle> = new EventEmitter();
  @Output()
  garbageFullClicked: EventEmitter<GarbageVehicle> = new EventEmitter();
  @Input()
  position?: EventEmitter<GarbageVehicle>;
  @Output()
  route: EventEmitter<GarbageVehicle> = new EventEmitter();
  @Output()
  wakeOnLAN: EventEmitter<GarbageVehicle> = new EventEmitter();

  //#endregion
  //#region ViewChild
  @ViewChild('iframe')
  element?: ElementRef;

  //#region video_list_prev
  prev?: ElementRef;
  @ViewChild('video_list_prev')
  set video_list_prev(element: ElementRef | undefined) {
    this.prev = element;
    if (this.prev) {
      this.elementInit();
      this.prev.nativeElement.onclick = () => {
        $('.ul')[0].onwheel({ deltaY: -1 });
      };
    }
  }
  get video_list_prev(): ElementRef | undefined {
    return this.prev;
  }
  //#endregion

  //#region video_list_next
  next?: ElementRef;
  @ViewChild('video_list_next')
  set video_list_next(element: ElementRef | undefined) {
    this.next = element;
    if (this.next) {
      this.elementInit();
      this.next.nativeElement.onclick = () => {
        $('.ul')[0].onwheel({ deltaY: 1 });
      };
    }
  }
  get video_list_next(): ElementRef | undefined {
    return this.next;
  }
  //#endregion
  //#endregion

  elementInit() {
    $('.ul').each(function (index: number, element: HTMLElement) {
      if (!element.onwheel) {
        element.onwheel = function (event) {
          const table = $(element).parents('.list');
          const right = $(element).width() - table[0].offsetWidth;
          if (table.scrollLeft() <= right && event.deltaY > 0) {
            // 禁止事件默认行为（此处禁止鼠标滚轮行为关联到"屏幕滚动条上下移动"行为）
            if (event.preventDefault) {
              event.preventDefault();
            }
            const left = table.scrollLeft() + 50;
            table.scrollLeft(left);
          }
          if (table.scrollLeft() >= 0 && event.deltaY < 0) {
            // 禁止事件默认行为（此处禁止鼠标滚轮行为关联到"屏幕滚动条上下移动"行为）
            if (event.preventDefault) {
              event.preventDefault();
            }
            const left = table.scrollLeft() - 50;
            table.scrollLeft(left);
          }
        };
      }
    });
  }

  src?: SafeResourceUrl;

  private get iframe(): HTMLIFrameElement | undefined {
    if (this.element && this.element.nativeElement.contentWindow) {
      let _iframe = this.element.nativeElement as HTMLIFrameElement;
      if (_iframe.contentWindow) {
        return _iframe;
      }
    }
    return;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
    public amap: CollectionMapControlBusiness,
    public info: GarbageVehiclePointInfoPanelBusiness,
    private toastr: ToastrService,
    private global: GlobalStorageService
  ) {}

  key = 'collection-map-control';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.position) {
      if (this.position) {
        this.position.subscribe((x) => {
          this.amap.pointSelect(x);
        });
      }
    }
  }
  ngAfterViewInit(): void {}

  //#region wait
  loadHandle?: NodeJS.Timer;
  private wait(reject: () => void) {
    this.loadHandle = setTimeout(() => {
      if (this.iframe) {
        reject();
      } else {
        this.wait(reject);
      }
    }, 100);
  }
  //#endregion

  ngOnInit(): void {
    this.global.interval.subscribe(this.key, (x) => {
      this.amap.init();
    });
    this.global.statusChange.subscribe((x) => {
      this.amap.divisionSelect(this.global.divisionId);
    });
    let src = this.amap.getSrc();
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    this.amap.pointDoubleClicked.subscribe((x) => {
      this.onPointDoubleClicked(x);
      this.info.vehicle = undefined;
    });
    this.amap.pointCountChanged.subscribe((count) => {
      this.pointCount = count;
    });
    this.amap.mapClicked.subscribe(() => {
      this.onMapClicked();
      this.info.vehicle = undefined;
    });
    this.amap.menuEvents.vehicleInformationClicked.subscribe((x) => {
      this.display.clear();
      this.display.status = false;
      this.info.vehicle = x;
    });
    this.amap.menuEvents.illegalDropClicked.subscribe((x) => {
      this.illegalDropClicked.emit(x);
    });
    this.amap.menuEvents.mixedIntoClicked.subscribe((x) => {
      this.mixedIntoClicked.emit(x);
    });
    this.amap.menuEvents.garbageCountClicked.subscribe((x) => {
      this.garbageCountClicked.emit(x);
    });
    this.amap.menuEvents.routeClicked.subscribe((x) => {
      this.route.emit(x);
    });
    this.amap.menuEvents.powerOnClicked.subscribe((x) => {
      this.topower(x, true);
    });
    this.amap.menuEvents.powerOffClicked.subscribe((x) => {
      this.topower(x, false);
    });
  }
  ngOnDestroy(): void {
    if (this.loadHandle) {
      clearTimeout(this.loadHandle);
    }
    this.global.interval.unsubscribe(this.key);
  }

  onLabelDisplay = (value: boolean) => {
    if (!value) {
      this.display.label.vehicle.value = true;
    }
  };
  onLabelStationDisplay = (value: boolean) => {
    this.amap.setPointVisibility(value);
  };

  display: MapControlDisplay = new MapControlDisplay({
    current: this.onLabelDisplay,
    vehicle: this.onLabelStationDisplay,
  });

  pointCount = 0;

  images: ImageControlModel[] = [];

  imageConverter = new ImageControlArrayConverter();

  selected: Selected = {};
  window = new CollectionMapControlWindow();
  //#region template event
  onLoad(event: Event) {
    this.wait(() => {
      this.amap.createMapClient(this.iframe!);
    });
  }
  //#endregion

  //#region map event regist
  onPointDoubleClicked(vehicle: GarbageVehicle) {
    this.display.clear();
    this.info.vehicle = undefined;
    this.selected.vehicle = vehicle;
    this.display.status = false;
    this.display.videoList = true;
    this.images = vehicle.Cameras
      ? this.imageConverter.Convert(vehicle.Cameras)
      : [];
    this.display.videoControl = this.images.length > 5;
    this.changeDetectorRef.detectChanges();
  }
  onMapClicked() {
    this.display.status = true;
    this.display.videoList = false;
  }
  //#endregion

  onCameraClicked(image: ImageControlModel) {
    if (this.selected.vehicle) {
      let camera = this.selected.vehicle.Cameras?.find(
        (x) => x.Id === image.id
      );
      this.VideoPlay.emit(camera);
    }
  }

  Button1Clicked() {
    this.patrol.emit();
  }
  Button2Clicked() {}
  Button3Clicked() {
    this.display.label.current = !this.display.label.current;
  }
  Button4Clicked() {
    this.display.label.vehicle.value = !this.display.label.vehicle.value;
  }

  onPointInfoPanelGarbageRetentionClickedEvent(vehicle: IModel) {
    this.garbageRetentionClicked.emit(vehicle as GarbageVehicle);
  }
  onPointInfoPanelIllegalDropClickedEvent(vehicle: IModel) {
    this.illegalDropClicked.emit(vehicle as GarbageVehicle);
  }
  onPointInfoPanelMixedIntoClickedEvent(vehicle: IModel) {
    this.mixedIntoClicked.emit(vehicle as GarbageVehicle);
  }
  onPointInfoPanelStateClickedEvent(vehicle: IModel) {
    this.garbageFullClicked.emit(vehicle as GarbageVehicle);
  }
  onpaneloption(item: PointInfoPanelModelOption) {
    switch (item.command) {
      case PointInfoPanelModelOptionCommand.collection_power_on:
        this.topower(item.data, true);
        break;
      case PointInfoPanelModelOptionCommand.collection_power_off:
        this.topower(item.data, false);
        break;

      default:
        break;
    }
  }

  onwindowclose() {
    this.window.clear();
    this.window.close();
  }
  topower(vehicle: GarbageVehicle, power: boolean) {
    this.window.confirm.model = vehicle;
    this.window.confirm.power = power;
    this.window.confirm.show = true;
  }
  onpower(vehicle: GarbageVehicle, power: boolean) {
    if (vehicle) {
      this.amap
        .power(vehicle.Id, power)
        .then((x) => {
          this.toastr.success('操作成功');
        })
        .catch((x) => {
          console.error(x);
          this.toastr.error('操作失败');
        })
        .finally(() => {
          this.onwindowclose();
        });
    }
  }
}

class MapControlDisplay {
  constructor(
    private events: {
      current: (state: boolean) => void;
      vehicle: (state: boolean) => void;
    }
  ) {}
  status = true;
  videoList = false;
  videoControl = false;
  label: MapControlLabelDisplay = new MapControlLabelDisplay(this.events);
  clear() {
    this.status = true;
    this.videoList = false;
    this.videoControl = false;
  }
}

class MapControlLabelDisplay {
  constructor(
    private events: {
      current: (state: boolean) => void;
      vehicle: (state: boolean) => void;
    }
  ) {
    this.vehicle.onChange.subscribe((x) => {
      events.vehicle(x);
    });
  }

  private _current: boolean = false;
  public get current(): boolean {
    return this._current;
  }
  public set current(v: boolean) {
    this._current = v;
    this.events.current(this._current);
  }

  vehicle = new ChangeControlModel(true);
}

interface Selected {
  vehicle?: GarbageVehicle;
}
