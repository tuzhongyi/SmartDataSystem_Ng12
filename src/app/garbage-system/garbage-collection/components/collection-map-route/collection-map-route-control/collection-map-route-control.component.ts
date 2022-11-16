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
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { GisRoutePoint } from 'src/app/network/model/gis-point.model';
import { IModel } from 'src/app/network/model/model.interface';
import { CollectionMapRouteControlChartsBusiness } from './business/collection-map-route-control-charts.business';
import { CollectionMapRouteControlBusiness } from './business/collection-map-route-control.business';

@Component({
  selector: 'collection-map-route-control',
  templateUrl: './collection-map-route-control.component.html',
  styleUrls: ['./collection-map-route-control.component.less'],
  providers: [
    CollectionMapRouteControlBusiness,
    CollectionMapRouteControlChartsBusiness,
  ],
})
export class CollectionMapRouteControlComponent
  implements IComponent<IModel, GisRoutePoint[]>, OnInit, AfterViewInit
{
  @Input()
  business: IBusiness<IModel, GisRoutePoint[]>;
  @Input()
  sourceId?: string;
  @Input()
  date: Date = new Date();

  @Output()
  loaded: EventEmitter<GisRoutePoint[]> = new EventEmitter();
  constructor(
    business: CollectionMapRouteControlBusiness,
    private charts: CollectionMapRouteControlChartsBusiness
  ) {
    this.business = business;
  }

  ngAfterViewInit(): void {
    this.loadData().then((x) => {
      this.loadCharts(x);
    });
  }

  @ViewChild('container')
  container?: ElementRef;

  ngOnInit(): void {}

  async loadData() {
    return await this.business.load(this.sourceId, this.date).then((datas) => {
      this.loaded.emit(datas);
      return datas;
    });
  }

  async loadCharts(datas: GisRoutePoint[]) {
    if (this.container) {
      let dom = this.container.nativeElement as HTMLDivElement;
      this.charts.load(dom, datas);
    }
  }
}
