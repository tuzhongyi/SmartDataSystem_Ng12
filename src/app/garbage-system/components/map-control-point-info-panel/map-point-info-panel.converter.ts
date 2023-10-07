import { Injectable } from '@angular/core';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import {
  MapPointInfoPanelModel,
  PointInfoPanelModelOptionCommand,
  PointInfoPanelModelState,
  PointInfoPanelModelStatistic,
} from './map-point-info-panel.model';
import { MapPointInfoPanelService } from './map-point-info-panel.service';

@Injectable()
export class MapPointInfoPanelConverter
  implements IConverter<GarbageStation, MapPointInfoPanelModel>
{
  constructor(private service: MapPointInfoPanelService) {}

  Convert(source: GarbageStation): MapPointInfoPanelModel {
    let model = new MapPointInfoPanelModel();
    model.id = source.Id;
    model.name = source.Name;
    model.address = source.Address ?? '';
    model.members = source.Members;
    model.type = source.StationType;
    if (source.GisPoint) {
      model.location = `${source.GisPoint.Longitude.toFixed(
        6
      )}, ${source.GisPoint.Latitude.toFixed(6)}`;
    }

    model.largeWaste = source.ConstructionData;

    if (source.DivisionId) {
      model.committeeName = new Promise((got) => {
        this.service.division.get(source.DivisionId!).then((division) => {
          got(division.Name);

          model.roadName = new Promise((gotRoadName) => {
            if (division.ParentId) {
              this.service.division.get(division.ParentId).then((parent) => {
                gotRoadName(parent.Name);
              });
            }
          });
        });
      });
    }

    model.statistic = this.service.station.statistic.number
      .get(source.Id)
      .then((statistic) => {
        return this.getStatistic(statistic);
      });
    model.state = [this.getState(source)];

    if (source.GarbageDeviceData) {
      model.device = this.service.device.get(source.GarbageDeviceData.DeviceId);
      model.device.then((x) => {
        model.options = [
          {
            className: 'mdi mdi-power-plug',
            command: PointInfoPanelModelOptionCommand.device_window_power_on,
            data: x,
            title: '窗口上电',
            language: '窗口上电',
          },
        ];
      });
    }
    return model;
  }

  private getState(station: GarbageStation) {
    let state: PointInfoPanelModelState = {
      language: '',
      className: 'normal',
    };
    let flags = new Flags(station.StationState);
    state.language = Language.StationStateFlags(flags);
    if (flags.contains(StationState.Error)) {
      state.className = 'error';
    } else if (flags.contains(StationState.Full)) {
      state.className = 'warm';
    } else if (
      station.GarbageDeviceData &&
      station.GarbageDeviceData.OnlineState !== OnlineStatus.Online
    ) {
      state.language = '故障';
      state.className = 'fault';
    } else {
      state.language = '';
      state.className = 'normal';
    }
    return state;
  }

  private getStatistic(statistic: GarbageStationNumberStatistic) {
    let model: PointInfoPanelModelStatistic = {
      GarbageStationGrade: '0',
      GarbageInterval: '',
      GarbageCount: 0,
      IllegalDropCount: 0,
      MixedIntoCount: 0,
    };
    model.GarbageCount = statistic.GarbageCount ?? 0;
    // 是否满溢
    // DryFull
    // 评分
    // Grade
    // 当前时长
    // CurrentGarbageTime
    console.log('statisticNumber', statistic);
    model.GarbageStationGrade =
      statistic.GarbageRatio === 100
        ? '100'
        : (statistic.GarbageRatio ?? 0).toFixed(2);

    // let hour = Math.floor(statistic.CurrentGarbageTime ?? 0 / 60);
    // let minute = Math.ceil(statistic.CurrentGarbageTime ?? 0 % 60);

    // this.GarbageInterval = hour ? hour + Language.json.Time.hour : '';
    // this.GarbageInterval = this.GarbageInterval
    //   ? this.GarbageInterval
    //   : minute + Language.json.Time.minute;

    model.GarbageInterval = Language.Time(
      statistic.CurrentGarbageTime ?? 0,
      false
    );

    if (statistic.TodayEventNumbers) {
      for (let i = 0; i < statistic.TodayEventNumbers.length; i++) {
        const item = statistic.TodayEventNumbers[i];
        switch (item.EventType) {
          case EventType.IllegalDrop:
            model.IllegalDropCount = item.DeltaNumber ?? 0;
            break;
          case EventType.MixedInto:
            model.MixedIntoCount = item.DeltaNumber ?? 0;
            break;

          default:
            break;
        }
      }
    }
    return model;
  }
}
