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
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { AMapBusiness } from './business/amap.business';
import { ListPanelBusiness } from './business/map-list-panel.business';
import { PointInfoPanelBusiness } from './business/point-info-panel.business';
import { ImageControlArrayConverter } from '../../../converter/image-control-array.converter';
import { Division } from 'src/app/network/model/division.model';
import { IModel } from 'src/app/network/model/model.interface';
import { MapControlSelected, MapControlTools } from './map-control.model';
import { wait } from 'src/app/common/tools/tool';
import { GarbageTimeFilter } from './business/amap.model';
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
  ) {
    this.display = this.initDisplay();
    // {
    //   current: this.onLabelDisplay.bind(this),
    //   station: this.onLabelStationDisplay.bind(this),
    // }
  }

  display: MapControlTools;

  loadHandle?: NodeJS.Timer;

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

  private initDisplay() {
    let display = new MapControlTools();
    display.filting.construction.display = false;
    display.filting.station.display = false;
    display.retention.station.display = false;
    display.retention.all.display = false;
    display.retention.m30.display = false;
    display.retention.h1.display = false;
    display.retention.h2.display = false;

    display.filting.current.click.subscribe((x) => {
      display.filting.current.selected = !display.filting.current.selected;
      display.retention.current.display = !display.filting.current.selected;
      display.filting.construction.display = display.filting.current.selected;
      display.filting.station.display = display.filting.current.selected;

      display.filting.construction.selected = true;
      display.filting.station.selected = true;
    });
    display.filting.construction.click.subscribe((x) => {
      display.filting.construction.selected =
        !display.filting.construction.selected;
    });
    display.filting.station.click.subscribe((x) => {
      display.filting.station.selected = !display.filting.station.selected;
    });
    display.retention.current.click.subscribe((x) => {
      display.retention.current.selected = !display.retention.current.selected;
      display.retention.station.display = display.retention.current.selected;
      display.retention.all.display = display.retention.current.selected;
      display.retention.m30.display = display.retention.current.selected;
      display.retention.h1.display = display.retention.current.selected;
      display.retention.h2.display = display.retention.current.selected;

      display.retention.station.selected = true;
      display.retention.all.selected = true;
      display.retention.m30.selected = false;
      display.retention.h1.selected = false;
      display.retention.h2.selected = false;
    });
    display.retention.station.click.subscribe((x) => {
      display.retention.station.selected = !display.retention.station.selected;
    });
    display.retention.all.click.subscribe((x) => {
      display.retention.all.selected = true;
      display.retention.m30.selected = !display.retention.all.selected;
      display.retention.h1.selected = !display.retention.all.selected;
      display.retention.h2.selected = !display.retention.all.selected;
    });
    display.retention.m30.click.subscribe((x) => {
      display.retention.m30.selected = true;
      display.retention.all.selected = !display.retention.m30.selected;
      display.retention.h1.selected = !display.retention.m30.selected;
      display.retention.h2.selected = !display.retention.m30.selected;
    });
    display.retention.h1.click.subscribe((x) => {
      display.retention.h1.selected = true;
      display.retention.all.selected = !display.retention.h1.selected;
      display.retention.m30.selected = !display.retention.h1.selected;
      display.retention.h2.selected = !display.retention.h1.selected;
    });
    display.retention.h2.click.subscribe((x) => {
      display.retention.h2.selected = true;
      display.retention.all.selected = !display.retention.h2.selected;
      display.retention.m30.selected = !display.retention.h2.selected;
      display.retention.h1.selected = !display.retention.h2.selected;
    });

    display.filting.construction.change.subscribe((x) => {
      this.amap.constructionStationVisibility(x);
    });
    display.filting.station.change.subscribe((x) => {
      this.amap.garbageStationVisibility(x);
      this.amap.visibility.label.station.value = x;
    });
    display.retention.all.change.subscribe((x) => {
      if (x) this.GarbageTimeFilting(GarbageTimeFilter.all);
    });
    display.retention.m30.change.subscribe((x) => {
      if (x) this.GarbageTimeFilting(GarbageTimeFilter.m30);
    });
    display.retention.h1.change.subscribe((x) => {
      if (x) this.GarbageTimeFilting(GarbageTimeFilter.h1);
    });
    display.retention.h2.change.subscribe((x) => {
      if (x) this.GarbageTimeFilting(GarbageTimeFilter.h2);
    });
    display.retention.station.change.subscribe((x) => {
      this.amap.visibility.label.station.value = x;
    });
    display.retention.current.change.subscribe((x) => {
      this.amap.visibility.label.value = x;
    });
    return display;
  }
  ngOnInit(): void {
    this.panel.init();

    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.amap.src);
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
      this.display.retention.station.display = true;
    }
    this.amap.visibility.label.value = value;
  };
  onLabelStationDisplay = (value: boolean) => {
    this.amap.visibility.label.value = value;
  };

  pointCount = 0;

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
        this.amap.createMapClient(this.iframe!);
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

  onPatrolClicked() {
    this.patrol.emit();
  }
  Button3Clicked() {
    this.display.retention.current.selected =
      !this.display.retention.current.selected;
  }
  onDurationClicked() {
    this.display.retention.station.selected =
      !this.display.retention.station.selected;
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

  GarbageTimeFilting(filter: GarbageTimeFilter) {
    this.amap.visibility.label.retention.value = filter;
    // this.amap.setLabelVisibility(false).then((x) => {
    //   // this.display.duration.current = this.display.duration.current;
    //   this.amap.setLabelVisibility(true).then(() => {
    //     // this.display.duration.station.display =
    //     //   this.display.duration.station.display;
    //   });
    // });
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
