import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GisRoutePoint } from 'src/app/network/model/garbage-station/gis-point.model';
import { CollectionMapRouteQuery } from '../collection-map-route-query/collection-map-route-query.model';
import { CollectionMapRouteControlChartsBusiness } from './business/collection-map-route-control-charts.business';
import { CollectionMapRouteControlOnlineBusiness } from './business/collection-map-route-control-online.business';
import { CollectionMapRouteControlPointBusiness } from './business/collection-map-route-control-point.business';
import { CollectionMapRouteControlScoreBusiness } from './business/collection-map-route-control-score.business';
import {
  CollectionMapRouteControlSource,
  ICollectionMapRouteControlChartsBusiness,
  ICollectionMapRouteControlComponent,
} from './collection-map-route-control.model';

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
  implements ICollectionMapRouteControlComponent, OnInit, AfterViewInit
{
  @Input()
  business: ICollectionMapRouteControlChartsBusiness;
  @Input()
  query?: CollectionMapRouteQuery;
  @Input()
  load?: EventEmitter<CollectionMapRouteQuery>;
  @Input()
  seek?: EventEmitter<GisRoutePoint>;
  @Input()
  focus: boolean = false;
  @Output()
  focusChange: EventEmitter<boolean> = new EventEmitter();
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

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.query = x;
        this.loadData(this.query);
      });
    }
    if (this.seek) {
      this.seek.subscribe((x) => {
        this.business.seek(x);
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.query) {
      this.loadData(this.query);
    }
  }

  loadData(query: CollectionMapRouteQuery) {
    this.hasdata = false;
    if (this.container) {
      this.loading = true;
      let dom = this.container.nativeElement as HTMLDivElement;
      this.business.load(dom, query).then((datas) => {
        this.loading = false;
        this.hasdata = datas.points && datas.points.length > 0;
        if (this.hasdata) {
          this.time = datas.points[0].Time;
        }
        this.loaded.emit(datas);
      });
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

  onfocus() {
    this.focusChange.emit(this.focus);
  }
  onmousewheel(e: Event) {
    if (e instanceof WheelEvent) {
      if (e.deltaY > 0 && this.level < 6) {
        this.level++;
      } else if (e.deltaY < 0 && this.level > 0) {
        this.level--;
      } else {
      }
    }
  }
}
