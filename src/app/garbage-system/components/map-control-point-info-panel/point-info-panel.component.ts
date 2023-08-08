import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Language } from 'src/app/common/tools/language';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { IModel } from 'src/app/network/model/model.interface';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PointInfoPanelBusiness } from './point-info-panel.business';
import {
  PointInfoPanelModel,
  PointInfoPanelModelOption,
  PointInfoPanelModelState,
} from './point-info-panel.model';

@Component({
  selector: 'app-point-info-panel',
  templateUrl: './point-info-panel.component.html',
  styleUrls: ['./point-info-panel.component.less'],
  providers: [PointInfoPanelBusiness],
})
export class PointInfoPanelComponent
  implements IComponent<IModel, PointInfoPanelModel>, OnInit
{
  @Input()
  business: IBusiness<IModel, PointInfoPanelModel>;

  @Input()
  set Source(val) {
    this.source = val;
    if (this.source) {
      this.business.load(this.source).then((x) => {
        this.model = x;
      });
    }
  }

  get Source() {
    return this.source;
  }

  @Input()
  VisibilityChange = (val: boolean) => {
    this.visibility = val;
  };

  /**
   *  状态点击事件
   *
   * @type {EventEmitter<GarbageStation>}
   * @memberof PointInfoPanelComponent
   */
  @Output()
  StateClickedEvent: EventEmitter<IModel> = new EventEmitter();

  @Output()
  GarbageRetentionClickedEvent: EventEmitter<IModel> = new EventEmitter();

  @Output()
  IllegalDropClickedEvent: EventEmitter<IModel> = new EventEmitter();

  @Output()
  MixedIntoClickedEvent: EventEmitter<IModel> = new EventEmitter();
  @Output()
  option: EventEmitter<PointInfoPanelModelOption> = new EventEmitter();
  constructor(
    private divisionService: DivisionRequestService,
    private garbageStationService: GarbageStationRequestService,
    business: PointInfoPanelBusiness
  ) {
    this.business = business;
    // this.GarbageStation.Members
  }

  Language = Language;

  visibility: boolean = false;

  source?: IModel;
  model: PointInfoPanelModel = new PointInfoPanelModel();
  StationType = StationType;
  ngOnInit() {}

  onGarbageRetentionClicked() {
    if (this.model.statistic) {
      this.model.statistic.then((statistic) => {
        if (statistic.GarbageCount <= 0) return;
        if (this.GarbageRetentionClickedEvent) {
          this.GarbageRetentionClickedEvent.emit(this.Source);
        }
      });
    }
  }
  onIllegalDropClicked() {
    if (this.model.statistic) {
      this.model.statistic.then((statistic) => {
        if (statistic.IllegalDropCount <= 0) return;
        if (this.IllegalDropClickedEvent) {
          this.IllegalDropClickedEvent.emit(this.Source);
        }
      });
    }
  }
  onMixedIntoClicked() {
    if (this.model.statistic) {
      this.model.statistic.then((statistic) => {
        if (statistic.MixedIntoCount <= 0) return;
        if (this.MixedIntoClickedEvent) {
          this.MixedIntoClickedEvent.emit(this.Source);
        }
      });
    }
  }
  onStateClicked(item: PointInfoPanelModelState) {
    if (!this.Source) return;
    if (this.Source instanceof GarbageStation) {
      if (
        this.Source.StationState.contains(StationState.Error) ||
        this.Source.StationState.contains(StationState.Full)
      )
        if (this.StateClickedEvent) {
          this.StateClickedEvent.emit(this.Source);
        }
    } else if (this.Source instanceof GarbageVehicle) {
      this.Source.State;
    }
  }

  onoption(item: PointInfoPanelModelOption) {
    this.option.emit(item);
  }
}
