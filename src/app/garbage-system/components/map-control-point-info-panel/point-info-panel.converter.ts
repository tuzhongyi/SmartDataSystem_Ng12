import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import {
  PointInfoPanelModel,
  PointInfoPanelModelState,
  PointInfoPanelModelStatistic,
} from './point-info-panel.model';

export class PointInfoPanelConverter
  implements IConverter<GarbageStation, PointInfoPanelModel>
{
  Convert(
    source: GarbageStation,
    getter: {
      division: (id: string) => Promise<Division>;
      statistic: (id: string) => Promise<GarbageStationNumberStatistic>;
    }
  ): PointInfoPanelModel {
    let model = new PointInfoPanelModel();
    model.id = source.Id;
    model.name = source.Name;
    model.address = source.Address ?? '';
    model.members = source.Members;
    if (source.DivisionId) {
      model.committeeName = new Promise((got) => {
        getter.division(source.DivisionId!).then((division) => {
          got(division.Name);

          model.roadName = new Promise((gotRoadName) => {
            if (division.ParentId) {
              getter.division(division.ParentId).then((parent) => {
                gotRoadName(parent.Name);
              });
            }
          });
        });
      });
    }

    model.statistic = getter.statistic(source.Id).then((statistic) => {
      return this.getStatistic(statistic);
    });
    model.state = [this.getState(source)];
    return model;
  }

  private getState(station: GarbageStation) {
    let state: PointInfoPanelModelState = {
      language: '',
      className: 'normal',
    };

    state.language = Language.StationStateFlags(station.StationState);
    if (station.StationState.contains(StationState.Error)) {
      state.className = 'error';
    } else if (station.StationState.contains(StationState.Full)) {
      state.className = 'warm';
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
