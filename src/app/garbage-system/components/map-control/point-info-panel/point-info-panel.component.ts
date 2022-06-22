import { DatePipe } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Flags } from 'src/app/common/tools/flags';
import { EventType } from 'src/app/enum/event-type.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { Language } from 'src/app/common/tools/language';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Component({
  selector: 'app-point-info-panel',
  templateUrl: './point-info-panel.component.html',
  styleUrls: ['./point-info-panel.component.css'],
})
export class PointInfoPanelComponent implements OnInit {
  Language = Language;

  visibility: boolean = false;

  committeeName: string = ''; // 居委会名称
  roadName: string = ''; // 街道名称

  _GarbageStation?: GarbageStation;
  @Input()
  set GarbageStation(val) {
    this._GarbageStation = val;
    if (this._GarbageStation) {
      this.onGarbageStationChanged(this._GarbageStation);
    }
  }

  get GarbageStation() {
    return this._GarbageStation;
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
  StateClickedEvent: EventEmitter<GarbageStation> = new EventEmitter();

  @Output()
  GarbageRetentionClickedEvent: EventEmitter<GarbageStation> = new EventEmitter();

  @Output()
  IllegalDropClickedEvent: EventEmitter<GarbageStation> = new EventEmitter();

  @Output()
  MixedIntoClickedEvent: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(
    private divisionService: DivisionRequestService,
    private garbageStationService: GarbageStationRequestService,
    private datePipe: DatePipe
  ) {
    // this.GarbageStation.Members
  }

  ngOnInit() { }

  onGarbageStationChanged(station: GarbageStation) {
    let flags = new Flags(station.StationState);
    this.state.language = Language.StationStateFlags(flags);
    if (flags.contains(StationState.Error)) {
      this.state.className = 'error';
    } else if (flags.contains(StationState.Full)) {
      this.state.className = 'warm';
    } else {
      this.state.language = '';
      this.state.className = 'normal';
    }

    if (station.DivisionId) {
      this.divisionService.get(station.DivisionId).then((res) => {
        this.committeeName = res.Name;
        if (res.ParentId) {
          this.divisionService.get(res.ParentId).then((res) => {
            this.roadName = res.Name;
          });
        }
      });
    }
    this.garbageStationService.statistic.number
      .get(station.Id)
      .then((statistic) => {
        this.GarbageCount = statistic.GarbageCount ?? 0;
        // 是否满溢
        // DryFull
        // 评分
        // Grade
        // 当前时长
        // CurrentGarbageTime
        console.log('statisticNumber', statistic);
        this.GarbageStationGrade =
          statistic.GarbageRatio === 100
            ? '100'
            : (statistic.GarbageRatio ?? 0).toFixed(2);

        // let hour = Math.floor(statistic.CurrentGarbageTime ?? 0 / 60);
        // let minute = Math.ceil(statistic.CurrentGarbageTime ?? 0 % 60);

        // this.GarbageInterval = hour ? hour + Language.json.Time.hour : '';
        // this.GarbageInterval = this.GarbageInterval
        //   ? this.GarbageInterval
        //   : minute + Language.json.Time.minute;

        this.GarbageInterval = Language.Time(statistic.CurrentGarbageTime ?? 0, false);

        if (statistic.TodayEventNumbers) {
          for (let i = 0; i < statistic.TodayEventNumbers.length; i++) {
            const item = statistic.TodayEventNumbers[i];
            switch (item.EventType) {
              case EventType.IllegalDrop:
                this.IllegalDropCount = item.DeltaNumber ?? 0;
                break;
              case EventType.MixedInto:
                this.MixedIntoCount = item.DeltaNumber ?? 0;
                break;

              default:
                break;
            }
          }
        }
      });
  }
  GarbageStationGrade: string = '0';
  GarbageInterval: string = '';
  GarbageCount: number = 0;
  IllegalDropCount: number = 0;
  MixedIntoCount: number = 0;

  state = {
    language: '',
    className: 'normal',
  };

  onGarbageRetentionClicked() {
    if (this.GarbageCount <= 0) return;
    if (this.GarbageRetentionClickedEvent) {
      this.GarbageRetentionClickedEvent.emit(this.GarbageStation);
    }
  }
  onIllegalDropClicked() {
    if (this.IllegalDropCount <= 0) return;
    if (this.IllegalDropClickedEvent) {
      this.IllegalDropClickedEvent.emit(this.GarbageStation);
    }
  }
  onMixedIntoClicked() {
    if (this.MixedIntoCount <= 0) return;
    if (this.MixedIntoClickedEvent) {
      this.MixedIntoClickedEvent.emit(this.GarbageStation);
    }
  }
  onStateClicked() {
    if (!this.GarbageStation) return;
    let flags = new Flags(this.GarbageStation.StationState);
    if (flags.contains(StationState.Error) || flags.contains(StationState.Full))
      if (this.StateClickedEvent) {
        this.StateClickedEvent.emit(this.GarbageStation);
      }
  }
}
