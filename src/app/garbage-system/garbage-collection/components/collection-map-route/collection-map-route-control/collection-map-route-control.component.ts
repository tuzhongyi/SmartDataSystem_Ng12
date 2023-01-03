import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CollectionMapRouteControlChartsBusiness } from './business/collection-map-route-control-charts.business';
import { CollectionMapRouteControlOnlineBusiness } from './business/collection-map-route-control-online.business';
import { CollectionMapRouteControlScoreBusiness } from './business/collection-map-route-control-score.business';
import { CollectionMapRouteControlPointBusiness } from './business/collection-map-route-control-point.business';
import {
  CollectionMapRouteControlSource,
  ICollectionMapRouteControlChartsBusiness,
  ICollectionMapRouteControlComponent,
} from './collection-map-route-control.model';
import { GisRoutePoint } from 'src/app/network/model/gis-point.model';

@Component({
  selector: 'collection-map-route-control',
  templateUrl: './collection-map-route-control.component.html',
  styleUrls: ['./collection-map-route-control.component.less'],
  providers: [
    CollectionMapRouteControlPointBusiness,
    CollectionMapRouteControlChartsBusiness,
    CollectionMapRouteControlOnlineBusiness,
    CollectionMapRouteControlScoreBusiness,
  ],
})
export class CollectionMapRouteControlComponent
  implements
    ICollectionMapRouteControlComponent,
    OnInit,
    AfterViewInit,
    OnChanges
{
  @Input()
  business: ICollectionMapRouteControlChartsBusiness;
  @Input()
  sourceId?: string;
  @Input()
  date: Date = new Date();
  @Input()
  load?: EventEmitter<void>;
  @Input()
  seek?: EventEmitter<GisRoutePoint>;

  @Output()
  scoreclick: EventEmitter<Date> = new EventEmitter();
  @Output()
  routetrigger: EventEmitter<Date> = new EventEmitter();
  @Output()
  routeclick: EventEmitter<Date> = new EventEmitter();
  @Output()
  runclick: EventEmitter<boolean> = new EventEmitter();

  @Output()
  loaded: EventEmitter<CollectionMapRouteControlSource> = new EventEmitter();
  constructor(charts: CollectionMapRouteControlChartsBusiness) {
    this.business = charts;
    this.business.scoreclick.subscribe(this.scoreclick);
    this.business.routetrigger.subscribe((x) => {
      this.routetrigger.emit(x);
    });
    this.business.routeclick.subscribe((x) => {
      this.time = x;
      if (this.playing) {
        this.business.stop();
        this.business.run(x);
      }
      this.routeclick.emit(x);
    });
  }

  time?: Date;
  playing = false;
  hasdata = false;
  loading = false;

  private _level: number = 0;
  public get level(): number {
    return this._level;
  }
  public set level(v: number) {
    this._level = v;
    this.business.speed = this.speed;
  }

  get speed() {
    return Math.pow(2, this.level);
  }

  @ViewChild('container')
  container?: ElementRef;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sourceId && !changes.sourceId.firstChange) {
      this.loadData();
    }
    if (changes.date && !changes.date.firstChange) {
      this.loadData();
    }
    if (changes.load && this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
    if (changes.seek && this.seek) {
      this.seek.subscribe((x) => {
        this.business.seek(x);
      });
    }
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    if (this.container && this.sourceId) {
      let dom = this.container.nativeElement as HTMLDivElement;
      let datas = await this.business.load(dom, this.sourceId, this.date);
      this.loading = false;
      this.hasdata = datas.points && datas.points.length > 0;
      if (this.hasdata) {
        this.time = datas.points[0].Time;
      }
      this.loaded.emit(datas);
    }
  }

  onrun() {
    this.playing = !this.playing;
    this.runclick.emit(this.playing);
    if (this.playing) {
      if (this.time) {
        this.business.run(this.time);
      }
    } else {
      this.business.stop();
    }
  }
}
