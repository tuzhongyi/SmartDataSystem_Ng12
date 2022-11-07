import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';
import { WidescreenStationTableBusiness } from './widescreen-station-table.business';
import { WidescreenStationModel } from './widescreen-station-table.model';

@Component({
  selector: 'howell-widescreen-station-table',
  templateUrl: './widescreen-station-table.component.html',
  styleUrls: ['../table.less', './widescreen-station-table.component.less'],
  providers: [WidescreenStationTableBusiness],
})
export class WidescreenStationTableComponent
  implements IComponent<IModel, WidescreenStationModel[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, WidescreenStationModel[]>;
  @Input()
  divisionId?: string;
  @Output()
  position: EventEmitter<GarbageStation> = new EventEmitter();
  @Output()
  video: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(business: WidescreenStationTableBusiness) {
    this.business = business;
  }

  StationState = StationState;

  widths = ['30%', '20%', '20%', '10%', '10%'];

  datas: WidescreenStationModel[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    if (this.divisionId) {
      this.datas = await this.business.load(this.divisionId);
    }
  }

  onvideo(e: Event, item: WidescreenStationModel) {
    this.video.emit(item.data);
  }
  onposition(e: Event, item: WidescreenStationModel<GarbageStation>) {
    this.position.emit(item.data);
  }
}
