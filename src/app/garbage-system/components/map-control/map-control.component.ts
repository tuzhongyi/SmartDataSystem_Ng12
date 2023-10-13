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
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { wait } from 'src/app/common/tools/tool';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { Camera } from 'src/app/network/model/camera.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { ImageControlArrayConverter } from '../../../converter/image-control-array.converter';
import { ListItemType } from '../map-control-list-panel/map-list-item';
import {
  PointInfoPanelModelOption,
  PointInfoPanelModelOptionCommand,
} from '../map-control-point-info-panel/map-point-info-panel.model';
import { AMapBusiness } from './business/amap.business';
import { GarbageTimeFilter, PointCount } from './business/amap.model';
import { AMapDivisionBusiness } from './business/amap/amap-division.business';
import { AMapPointContextMenuBusiness } from './business/amap/amap-point-menu.business';
import { AMapPointPlugAceBusiness } from './business/amap/amap-point-plug-ace.business';
import { AMapPointPlugBatteryBusiness } from './business/amap/amap-point-plug-battery.business';
import { AMapPointPlugBusiness } from './business/amap/amap-point-plug.business';
import { AMapPointBusiness } from './business/amap/amap-point.business';
import { AMapClient } from './business/amap/amap.client';
import { AMapEvent } from './business/amap/amap.event';
import { AMapService } from './business/amap/amap.service';
import { MapControlAIDeviceBusiness } from './business/map-ai-device.business';
import { MapControlGuideBusiness } from './business/map-control-guide.business';
import { ListPanelBusiness } from './business/map-list-panel.business';
import { PointInfoPanelBusiness } from './business/point-info-panel.business';
import { ListPanelConverter } from './converter/map-list-panel.converter';
import {
  MapControlSelected,
  MapControlTools,
  MapControlWindow,
} from './map-control.model';
declare var $: any;
@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: [
    '../../../../assets/less/confirm.less',
    './map-control.component.less',
  ],
  providers: [
    AMapEvent,
    AMapClient,
    AMapService,
    AMapDivisionBusiness,
    AMapPointBusiness,
    AMapPointPlugBusiness,
    AMapPointPlugAceBusiness,
    AMapPointPlugBatteryBusiness,
    AMapPointContextMenuBusiness,
    AMapBusiness,
    MapControlAIDeviceBusiness,
    ListPanelConverter,
    ListPanelBusiness,
    PointInfoPanelBusiness,
    MapControlGuideBusiness,
  ],
})
export class MapControlComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() position?: EventEmitter<GarbageStation>;
  @Input() filting?: boolean;

  @Input()
  public set showmenu(v: boolean) {
    if (v) {
      this.guide.showmenu();
    } else {
      this.guide.closemenu();
    }
  }
  @Input()
  public set showinfo(v: boolean) {
    if (v) {
      this.guide.showpointinfo();
    } else {
      this.guide.closepointinfo();
    }
  }
  @Input()
  public set showcameras(v: boolean) {
    if (v) {
      this.guide.station.then((station) => {
        this.onPointDoubleClicked(station);
      });
    } else {
      this.onMapClicked();
    }
  }
  @Input()
  public set showvideo(v: boolean) {
    if (v) {
      this.guide.station.then((station) => {
        let camera = station.Cameras![0];
        this.VideoPlay.emit(camera);
      });
    }
  }

  //#region Output
  @Output() VideoPlay: EventEmitter<Camera> = new EventEmitter();
  @Output() patrol: EventEmitter<void> = new EventEmitter();
  // 垃圾落地记录
  @Output() illegalDropClicked: EventEmitter<GarbageStation> =
    new EventEmitter();
  // 混合投放记录
  @Output() mixedIntoClicked: EventEmitter<GarbageStation> = new EventEmitter();
  // 小包垃圾滞留
  @Output() garbageCountClicked: EventEmitter<GarbageStation> =
    new EventEmitter();
  // 垃圾滞留投放点
  @Output() garbageRetentionClicked: EventEmitter<GarbageStation> =
    new EventEmitter();
  @Output() garbageFullClicked: EventEmitter<GarbageStation> =
    new EventEmitter();
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
    public amap: AMapBusiness,
    public panel: ListPanelBusiness,
    public info: PointInfoPanelBusiness,
    private device: MapControlAIDeviceBusiness,
    private toastr: ToastrService,
    private guide: MapControlGuideBusiness
  ) {
    this.display = this.initDisplay();
    // {
    //   current: this.onLabelDisplay.bind(this),
    //   station: this.onLabelStationDisplay.bind(this),
    // }
  }

  display: MapControlTools;
  loadHandle?: NodeJS.Timer;
  window = new MapControlWindow();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.position) {
      if (this.position) {
        this.position.subscribe((x) => {
          this.amap.point.select(x.Id);
        });
      }
    }
  }
  ngAfterViewInit(): void {}

  private initDisplay() {
    let display = new MapControlTools();

    return display;
  }
  ngOnInit(): void {
    this.panel.init();

    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.amap.src);

    this.amap.event.mapclick.subscribe(() => {
      this.onMapClicked();
      this.info.station = undefined;
    });
    this.amap.event.point.count.subscribe((count) => {
      this.pointCount = count;
    });
    this.amap.event.menu.click.subscribe((x) => {
      this.onMapClicked();
      this.info.station = undefined;
    });
    this.amap.event.menu.information.subscribe((x) => {
      this.info.station = x;
      this.display.status = false;
    });
    this.amap.event.menu.illegaldrop.subscribe((x) => {
      this.illegalDropClicked.emit(x);
    });
    this.amap.event.menu.mixedinto.subscribe((x) => {
      this.mixedIntoClicked.emit(x);
    });
    this.amap.event.menu.garbagedrop.subscribe((x) => {
      this.garbageCountClicked.emit(x);
    });
    this.amap.event.menu.video.subscribe((x) => {
      this.onPointDoubleClicked(x);
      this.info.station = undefined;
    });
    this.amap.event.point.doubleclick.subscribe((x) => {
      this.onPointDoubleClicked(x);
      this.info.station = undefined;
    });

    this.panel.itemSelected.subscribe((x) => {
      if (x instanceof Division) {
        this.amap.division.select(x.Id);
        this.panel.datasource.forEach((y) => {
          if (y.type != ListItemType.Parent) {
            y.hasChild = !!this.amap.source.all.find(
              (g) => g.DivisionId! === y.Id
            );
          }
        });
      } else if (x instanceof GarbageStation) {
        this.amap.point.select(x.Id);
      } else {
      }
    });
  }
  ngOnDestroy(): void {
    if (this.loadHandle) {
      clearTimeout(this.loadHandle);
    }
  }

  pointCount: PointCount = new PointCount();

  images: ImageControlModel[] = [];

  imageConverter = new ImageControlArrayConverter();

  selected: MapControlSelected = {};

  //#region template event
  onLoad(event: Event) {
    wait(
      () => {
        return !!this.iframe;
      },
      () => {
        this.amap.init(this.iframe!);
      }
    );
  }
  //#endregion

  //#region map event regist
  onPointDoubleClicked(station: GarbageStation) {
    this.selected.station = station;
    this.display.status = false;
    this.display.videoList = true;
    this.images = station.Cameras
      ? this.imageConverter.Convert(
          station.Cameras.filter(
            (x) => !EnumHelper.CameraIgnore(x.Classification)
          )
        )
      : [];
    if (this.images.length > 1) {
      this.images = this.images.sort((a, b) => {
        return LocaleCompare.compare(a.name, b.name);
      });
    }
    this.display.videoControl = this.images.length > 5;
    this.changeDetectorRef.detectChanges();
  }
  onMapClicked() {
    this.display.status = true;
    this.display.videoList = false;
  }
  //#endregion

  onCameraClicked(image: ImageControlModel) {
    if (this.selected.station) {
      let camera = this.selected.station.Cameras?.find(
        (x) => x.Id === image.id
      );
      this.VideoPlay.emit(camera);
    }
  }

  onPatrolClicked() {
    this.patrol.emit();
  }

  onPointInfoPanelGarbageRetentionClickedEvent(station: IModel) {
    this.garbageRetentionClicked.emit(station as GarbageStation);
  }
  onPointInfoPanelIllegalDropClickedEvent(station: IModel) {
    this.illegalDropClicked.emit(station as GarbageStation);
  }
  onPointInfoPanelMixedIntoClickedEvent(station: IModel) {
    this.mixedIntoClicked.emit(station as GarbageStation);
  }
  onPointInfoPanelStateClickedEvent(station: IModel) {
    this.garbageFullClicked.emit(station as GarbageStation);
  }

  GarbageTimeFilter = GarbageTimeFilter;

  onwindowclose() {
    this.window.clear();
    this.window.close();
  }

  onpaneloption(item: PointInfoPanelModelOption) {
    switch (item.command) {
      case PointInfoPanelModelOptionCommand.device_window_power_on:
        this.toconfirm(item.data);
        break;
      default:
        break;
    }
  }

  toconfirm(model: GarbageStation) {
    this.window.confirm.model = model;
    this.window.confirm.show = true;
  }

  ondevicewindowpoweron(model?: GarbageStation) {
    if (model) {
      this.device
        .command(model.Id)
        .then((x) => {
          this.toastr.success('操作成功');
        })
        .catch((x) => {
          console.log(model, x);
          this.toastr.error('操作失败');
        })
        .finally(() => {
          this.onwindowclose();
        });
    }
  }
}
