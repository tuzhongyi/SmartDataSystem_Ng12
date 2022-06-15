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
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ChangeControlModel } from 'src/app/view-model/change-control.model';
import { AMapBusiness, GarbageTimeFilter } from './business/amap.business';
import { ListPanelBusiness } from './business/map-list-panel.business';
import { PointInfoPanelBusiness } from './business/point-info-panel.business';
import { ImageControlArrayConverter } from '../../../converter/image-control-array.converter';
import { Division } from 'src/app/network/model/division.model';
declare var $: any;
@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.less'],
  providers: [AMapBusiness, ListPanelBusiness, PointInfoPanelBusiness],
})
export class MapControlComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  //#region Output
  @Output()
  VideoPlay: EventEmitter<Camera> = new EventEmitter();
  @Output()
  patrol: EventEmitter<void> = new EventEmitter();
  // 垃圾落地记录
  @Output()
  illegalDropClicked: EventEmitter<GarbageStation> = new EventEmitter();
  // 混合投放记录
  @Output()
  mixedIntoClicked: EventEmitter<GarbageStation> = new EventEmitter();
  // 小包垃圾滞留
  @Output()
  garbageCountClicked: EventEmitter<GarbageStation> = new EventEmitter();
  // 垃圾滞留投放点
  @Output()
  garbageRetentionClicked: EventEmitter<GarbageStation> = new EventEmitter();
  @Output()
  garbageFullClicked: EventEmitter<GarbageStation> = new EventEmitter();
  @Input()
  position?: EventEmitter<GarbageStation>;

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
    public info: PointInfoPanelBusiness
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.position) {
      if (this.position) {
        this.position.subscribe((x) => {
          this.amap.pointSelect(x.Id);
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
    this.panel.init();

    let src = this.amap.getSrc();
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    this.amap.pointDoubleClicked.subscribe((x) => {
      this.onPointDoubleClicked(x);
      this.info.station = undefined;
    });
    this.amap.pointCountChanged.subscribe((count) => {
      this.pointCount = count;
    });
    this.amap.mapClicked.subscribe(() => {
      this.onMapClicked();
      this.info.station = undefined;
    });
    this.amap.menuEvents.stationInformationClicked.subscribe((x) => {
      this.info.station = x;
      this.display.status = false;
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

    this.panel.itemSelected.subscribe((x) => {
      if (x instanceof Division) {
        this.amap.divisionSelect(x.Id);
      } else if (x instanceof GarbageStation) {
        this.amap.pointSelect(x.Id);
      } else {
      }
    });
  }
  ngOnDestroy(): void {
    if (this.loadHandle) {
      clearTimeout(this.loadHandle);
    }
  }

  onLabelDisplay = (value: boolean) => {
    if (!value) {
      this.display.label.station.value = true;
    }
    this.amap.setLabelVisibility(value);
  };
  onLabelStationDisplay = (value: boolean) => {
    this.amap.setPointVisibility(value);
  };

  display: MapControlDisplay = new MapControlDisplay({
    current: this.onLabelDisplay,
    station: this.onLabelStationDisplay,
  });

  pointCount = 0;

  images: ImageControlModel[] = [];

  imageConverter = new ImageControlArrayConverter();

  selected: Selected = {};

  //#region template event
  onLoad(event: Event) {
    this.wait(() => {
      this.amap.createMapClient(this.iframe!);
    });
  }
  //#endregion

  //#region map event regist
  onPointDoubleClicked(station: GarbageStation) {
    this.selected.station = station;
    this.display.status = false;
    this.display.videoList = true;
    this.images = station.Cameras
      ? this.imageConverter.Convert(station.Cameras)
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
    if (this.selected.station) {
      let camera = this.selected.station.Cameras?.find(
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
    this.display.label.station.value = !this.display.label.station.value;
  }

  onPointInfoPanelGarbageRetentionClickedEvent(station: GarbageStation) {
    this.garbageRetentionClicked.emit(station);
  }
  onPointInfoPanelIllegalDropClickedEvent(station: GarbageStation) {
    this.illegalDropClicked.emit(station);
  }
  onPointInfoPanelMixedIntoClickedEvent(station: GarbageStation) {
    this.mixedIntoClicked.emit(station);
  }
  onPointInfoPanelStateClickedEvent(station: GarbageStation) {
    this.garbageFullClicked.emit(station);
  }

  GarbageTimeFilter = GarbageTimeFilter;

  GarbageTimeFilting(filter: GarbageTimeFilter) {
    this.amap.labelFilter = filter;
    this.amap.setLabelVisibility(false).then((x) => {
      this.display.label.current = this.display.label.current;
      this.amap.setLabelVisibility(true).then(() => {
        this.display.label.station.value = this.display.label.station.value;
      });
    });
  }

  ButtonAllClicked() {
    this.GarbageTimeFilting(GarbageTimeFilter.all);
  }
  Button30mClicked() {
    this.GarbageTimeFilting(GarbageTimeFilter.m30);
  }

  Button1hClicked() {
    this.GarbageTimeFilting(GarbageTimeFilter.h1);
  }

  Button2hClicked() {
    this.GarbageTimeFilting(GarbageTimeFilter.h2);
  }
}

class MapControlDisplay {
  constructor(
    private events: {
      current: (state: boolean) => void;
      station: (state: boolean) => void;
    }
  ) {}
  status = true;
  videoList = false;
  videoControl = false;
  label: MapControlLabelDisplay = new MapControlLabelDisplay(this.events);
}

class MapControlLabelDisplay {
  constructor(
    private events: {
      current: (state: boolean) => void;
      station: (state: boolean) => void;
    }
  ) {
    this.station.onChange.subscribe((x) => {
      events.station(x);
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

  station = new ChangeControlModel(true);
}

interface Selected {
  station?: GarbageStation;
}
