import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { IModel, PagedArgs } from 'src/app/network/model/model.interface';
import { Page } from 'src/app/network/model/page_list.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { GarbageDropStationWindowItemDurationBusiness } from './garbage-drop-window-item-duration.business';
import { GarbageDropStationWindowItemDurationModel } from './garbage-drop-window-item-duration.model';

@Component({
  selector: 'garbage-drop-window-item-duration',
  templateUrl: './garbage-drop-window-item-duration.component.html',
  styleUrls: ['./garbage-drop-window-item-duration.component.less'],
  providers: [GarbageDropStationWindowItemDurationBusiness],
})
export class GarbageDropStationWindowItemDurationComponent
  implements
    OnInit,
    IComponent<IModel, GarbageDropStationWindowItemDurationModel>
{
  @Input() business: IBusiness<
    IModel,
    GarbageDropStationWindowItemDurationModel
  >;

  @Input() stationId?: string;

  @Output() image: EventEmitter<PagedArgs<ImageControlModel>> =
    new EventEmitter();
  @Output() ondblclick: EventEmitter<LineZoomChartArgs> = new EventEmitter();

  constructor(business: GarbageDropStationWindowItemDurationBusiness) {
    this.business = business;
  }

  date: Date = new Date();

  unit: TimeUnit = TimeUnit.Hour;

  model: GarbageDropStationWindowItemDurationModel =
    new GarbageDropStationWindowItemDurationModel();

  chartLoad: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    if (this.stationId) {
      this.loadData(this.stationId, this.date);
    }
  }

  async loadData(stationId: string, date: Date) {
    this.model = await this.business.load(stationId, date);
    // console.log(this.model);
    this.chartLoad.emit(stationId);
  }

  changeDate(date: Date) {
    if (this.stationId) {
      this.loadData(this.stationId, date);
    }
  }
  onstationselect(station: GarbageStation) {
    this.stationId = station.Id;
    if (this.stationId) this.loadData(this.stationId, this.date);
  }
  onimage(model: ImageControlModel) {
    this.image.emit({
      page: Page.create(0),
      data: model,
    });
  }
  onchartdblclick(args: LineZoomChartArgs) {
    this.ondblclick.emit(args);
  }
}
