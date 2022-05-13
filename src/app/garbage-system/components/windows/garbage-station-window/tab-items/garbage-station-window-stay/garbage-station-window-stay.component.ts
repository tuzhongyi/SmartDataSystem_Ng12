import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/view-model/image-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TreeSelectEnum } from 'src/app/enum/tree-select.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';
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
  ondblclick: EventEmitter<GarbageStationGarbageCountStatistic> = new EventEmitter();

  date: Date = new Date();

  unit: TimeUnit = TimeUnit.Hour;

  model?: GarbageStationWindowStayModel;

  chartLoad: EventEmitter<void> = new EventEmitter();

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
    this.chartLoad.emit();
  }

  changeDate(date: Date) {
    this.date = date;
    if (this.stationId) {
      this.loadData(this.stationId, this.date);
      this.chartLoad.emit();
    }
  }
  onstationselect(station: GarbageStation) {
    this.stationId = station.Id;
    this.loadData(this.stationId, this.date);
    this.chartLoad.emit();
  }
  onimage(model: ImageControlModel) {
    let array = new ImageControlModelArray([model], 0, true);
    this.image.emit(array);
  }
  onchartdblclick(statistic: GarbageStationGarbageCountStatistic) {
    this.ondblclick.emit(statistic);
  }
}
