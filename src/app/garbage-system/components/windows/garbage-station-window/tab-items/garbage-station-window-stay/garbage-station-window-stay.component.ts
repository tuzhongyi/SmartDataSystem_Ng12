import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { IModel, PagedArgs } from 'src/app/network/model/model.interface';
import { Page } from 'src/app/network/model/page_list.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { GarbageStationWindowStayBusiness } from './garbage-station-window-stay.business';
import { GarbageStationWindowStayModel } from './garbage-station-window-stay.model';

@Component({
  selector: 'howell-garbage-station-window-stay',
  templateUrl: './garbage-station-window-stay.component.html',
  styleUrls: ['./garbage-station-window-stay.component.less'],
  providers: [GarbageStationWindowStayBusiness],
})
export class GarbageStationWindowStayComponent
  implements OnInit, IComponent<IModel, GarbageStationWindowStayModel>
{
  @Input()
  business: IBusiness<IModel, GarbageStationWindowStayModel>;

  @Input()
  stationId?: string;

  @Output()
  image: EventEmitter<PagedArgs<ImageControlModel>> = new EventEmitter();
  @Output()
  ondblclick: EventEmitter<LineZoomChartArgs> = new EventEmitter();

  date: Date = new Date();

  unit: TimeUnit = TimeUnit.Hour;

  model: GarbageStationWindowStayModel = new GarbageStationWindowStayModel();

  chartLoad: EventEmitter<string> = new EventEmitter();

  constructor(business: GarbageStationWindowStayBusiness) {
    this.business = business;
  }

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
