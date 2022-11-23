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
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { GisRoutePoint } from 'src/app/network/model/gis-point.model';
import { IModel } from 'src/app/network/model/model.interface';
import { CollectionMapRouteControlChartsBusiness } from './business/collection-map-route-control-charts.business';
import { CollectionMapRouteControlOnlineBusiness } from './business/collection-map-route-control-online.business';
import { CollectionMapRouteControlScoreBusiness } from './business/collection-map-route-control-score.business';
import { CollectionMapRouteControlPointBusiness } from './business/collection-map-route-control-point.business';
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
  @Output()
  scoreclick: EventEmitter<any> = new EventEmitter();
  @Output()
  routeclick: EventEmitter<Date> = new EventEmitter();

  @Output()
  loaded: EventEmitter<CollectionMapRouteControlSource> = new EventEmitter();
  constructor(charts: CollectionMapRouteControlChartsBusiness) {
    this.business = charts;
    this.business.scoreclick.subscribe(this.scoreclick);
    this.business.routeclick.subscribe((x) => {
      this.time = x;
      this.routeclick.emit(x);
    });
  }

  time?: Date;

  @ViewChild('container')
  container?: ElementRef;

  ngOnInit(): void {
    this.date = new Date(2022, 10, 18);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sourceId && !changes.sourceId.firstChange) {
      this.loadData();
    }
    if (changes.date && !changes.date.firstChange) {
      this.loadData();
    }
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  async loadData() {
    if (this.container && this.sourceId) {
      let dom = this.container.nativeElement as HTMLDivElement;
      let datas = await this.business.load(dom, this.sourceId, this.date);
      if (datas.points && datas.points.length > 0) {
        this.time = datas.points[0].Time;
      }
      this.loaded.emit(datas);
    }
  }

  onrun() {
    if (this.time) {
      this.business.run(this.time);
    }
  }
}
