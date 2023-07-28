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
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { wait } from 'src/app/common/tools/tool';
import { Camera } from 'src/app/network/model/camera.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { ImageControlArrayConverter } from '../../../converter/image-control-array.converter';
import { ListItemType } from '../map-control-list-panel/map-list-item';
import { AMapBusiness } from './business/amap.business';
import { GarbageTimeFilter, PointCount } from './business/amap.model';
import { AMapDivisionBusiness } from './business/amap/amap-division.business';
import { AMapPointLabelBusiness } from './business/amap/amap-point-label.business';
import { AMapPointContextMenuBusiness } from './business/amap/amap-point-menu.business';
import { AMapPointBusiness } from './business/amap/amap-point.business';
import { AMapClient } from './business/amap/amap.client';
import { AMapEvent } from './business/amap/amap.event';
import { AMapService } from './business/amap/amap.service';
import { ListPanelBusiness } from './business/map-list-panel.business';
import { PointInfoPanelBusiness } from './business/point-info-panel.business';
import { MapControlSelected, MapControlTools } from './map-control.model';
declare var $: any;
@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.less'],
  providers: [
    AMapEvent,
    AMapClient,
    AMapService,
    AMapDivisionBusiness,
    AMapPointBusiness,
    AMapPointLabelBusiness,
    AMapPointContextMenuBusiness,
    AMapBusiness,
    ListPanelBusiness,
    PointInfoPanelBusiness,
  ],
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
          this.amap.point.select(x.Id);
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
      display.filting.construction.display = display.filting.current.selected;
      display.filting.station.display = display.filting.current.selected;

      display.filting.construction.selected = true;
      display.filting.station.selected = true;

      if (
        display.filting.current.selected &&
        display.retention.current.selected
      ) {
        display.retention.current.click.emit();
      }
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
      if (
        display.filting.current.selected &&
        display.retention.current.selected
      ) {
        display.filting.current.click.emit();
      }
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
      this.amap.point.constructionStationVisibility(x);
    });
    display.filting.station.change.subscribe((x) => {
      this.amap.point.garbageStationVisibility(x);
      // this.amap.point.visibility.label.station.value = x;
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
      this.amap.point.visibility.label.station.value = x;
      this.amap.point.constructionStationVisibility(x);
    });
    display.retention.current.change.subscribe((x) => {
      this.amap.point.visibility.label.value = x;
    });

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

  onLabelDisplay = (value: boolean) => {
    if (!value) {
      this.display.retention.station.display = true;
    }
    this.amap.point.visibility.label.value = value;
  };
  onLabelStationDisplay = (value: boolean) => {
    this.amap.point.visibility.label.value = value;
  };

  pointCount: PointCount = { count: 0, normal: 0, warm: 0, error: 0 };

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
      ? this.imageConverter.Convert(station.Cameras)
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
    this.amap.point.visibility.label.retention.value = filter;
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
