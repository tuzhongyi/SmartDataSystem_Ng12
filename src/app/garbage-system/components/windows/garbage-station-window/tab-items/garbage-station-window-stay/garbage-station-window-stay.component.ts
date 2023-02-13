import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/view-model/image-control.model';
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
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
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
    let array = new ImageControlModelArray([model], 0, true);
    this.image.emit(array);
  }
  onchartdblclick(args: LineZoomChartArgs) {
    this.ondblclick.emit(args);
  }
}
