import { Injectable } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Flags } from 'src/app/common/tools/flags';
import { IconTool } from 'src/app/common/tools/icon-tool/icon.tool';
import { Language } from 'src/app/common/tools/language';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import {
  MapControlButtonType,
  MapControlTreeNode,
  MapControlTreeNodeButton,
} from './map-control-tree.model';

@Injectable()
export class MapControlTreeConverter {
  tree(
    divisions: Division[],
    stations: GarbageStation[],
    root: Division,
    defaultType: DivisionType,
    drops: GarbageStationNumberStatistic[],
    statistic: GarbageStationNumberStatistic[]
  ) {
    let _root = this.convert(root, defaultType);
    let nodes = [
      ...divisions.map((x) => this.convert(x, defaultType)),
      ...stations.map((x) =>
        this.convert(
          x,
          defaultType,
          drops.find((y) => y.Id === x.Id),
          statistic.find((y) => y.Id === x.Id)
        )
      ),
    ];
    return this.arrayToTree(nodes, _root);
  }

  flat(
    stations: GarbageStation[],

    drops: GarbageStationNumberStatistic[],
    statistic: GarbageStationNumberStatistic[]
  ) {
    let nodes = [
      ...stations.map((x) =>
        this.convert(
          x,
          undefined,
          drops.find((y) => y.Id === x.Id),
          statistic.find((y) => y.Id === x.Id)
        )
      ),
    ];
    return nodes;
  }

  arrayToTree(
    arr: MapControlTreeNode[],
    root: MapControlTreeNode
  ): MapControlTreeNode[] {
    return arr
      .filter((item) => item.parentId === root.id)
      .map((item) => {
        item.children = this.arrayToTree(arr, item);
        item.extendable = !!item.children && item.children.length > 0;
        return item;
      });
  }

  refresh(
    node: MapControlTreeNode,
    drop?: GarbageStationNumberStatistic,
    statistic?: GarbageStationNumberStatistic
  ) {
    node.buttons = [];
    let state = [];
    if (drop) {
      node.icon = `${IconTool.StationType(
        node.data.StationType
      )} orange-red-text`;
      state.push('滞留');
      let btn_time = new MapControlTreeNodeButton(
        node.data,
        MapControlButtonType.drop
      );

      btn_time.text = this.time(drop.CurrentGarbageTime ?? 0);
      btn_time.class = 'light-blue-text';
      btn_time.title = Language.Time(drop.CurrentGarbageTime ?? 0);
      node.buttons.push(btn_time);
    } else {
      node.icon = `${IconTool.StationType(
        node.data.StationType
      )} ${ColorTool.class.StationState(node.data.StationState)}`;
    }

    let flags = new Flags(node.data.StationState);
    if (flags.contains(StationState.Error)) {
      state.push('异常');
    }
    if (flags.contains(StationState.Full)) {
      state.push('满溢');
    }
    node.icontitle = state.join(',');

    if (statistic) {
      if (statistic.TodayEventNumbers) {
        let alarms = [];
        for (let i = 0; i < statistic.TodayEventNumbers.length; i++) {
          const item = statistic.TodayEventNumbers[i];
          switch (item.EventType) {
            case EventType.IllegalDrop:
            case EventType.MixedInto:
              if (item.DayNumber > 0) {
                alarms.push(
                  `${Language.EventType(item.EventType)}:${item.DayNumber}`
                );
              }
              break;
            default:
              break;
          }
        }
        if (alarms.length > 0) {
          let btn_alarm = new MapControlTreeNodeButton(
            node.data,
            MapControlButtonType.alarm
          );
          btn_alarm.icon = 'howell-icon-alarm3';
          btn_alarm.title = alarms.join(',');
          node.buttons.push(btn_alarm);
        }
      }
    }

    let info = new MapControlTreeNodeButton(
      node.data,
      MapControlButtonType.info
    );
    info.icon = 'mdi mdi-file-document-box';
    info.title = '详情';
    info.class = 'hover';
    node.buttons.push(info);

    return node;
  }

  convert(
    data: Division | GarbageStation,
    defaultType?: DivisionType,
    drop?: GarbageStationNumberStatistic,
    statistic?: GarbageStationNumberStatistic
  ): MapControlTreeNode {
    if (data instanceof Division) {
      return this.division(data, defaultType);
    } else if (data instanceof GarbageStation) {
      return this.station(data, defaultType, drop, statistic);
    } else {
      throw new Error('数据类型错误');
    }
  }

  private division(data: Division, defaultType?: DivisionType) {
    let node = new MapControlTreeNode<Division>(data.Id, data.Name, data);
    node.children = [];
    node.icon = 'howell-icon-neighborhood';
    if (defaultType) {
      node.level = this.level(data, defaultType);
    }
    node.extendable = true;
    node.parentId = data.ParentId;

    return node;
  }

  time(number: number): string {
    let m = Math.round(number % 60);
    let h = Math.floor(number / 60);
    if (h) {
      return `${h}:${m}'`;
    } else if (m) {
      return `${m}'`;
    }
    return '';
  }

  private station(
    data: GarbageStation,

    defaultType?: DivisionType,
    drop?: GarbageStationNumberStatistic,
    statistic?: GarbageStationNumberStatistic
  ) {
    let node = new MapControlTreeNode<GarbageStation>(data.Id, data.Name, data);
    let state = [];
    if (drop) {
      node.icon = `${IconTool.StationType(data.StationType)} orange-red-text`;
      state.push('滞留');
      let btn_time = new MapControlTreeNodeButton(
        data,
        MapControlButtonType.drop
      );

      btn_time.text = this.time(drop.CurrentGarbageTime ?? 0);
      btn_time.class = 'light-blue-text';
      btn_time.title = Language.Time(drop.CurrentGarbageTime ?? 0);
      node.buttons.push(btn_time);
    } else {
      node.icon = `${IconTool.StationType(
        data.StationType
      )} ${ColorTool.class.StationState(data.StationState)}`;
    }

    let flags = new Flags(data.StationState);
    if (flags.contains(StationState.Error)) {
      state.push('异常');
    }
    if (flags.contains(StationState.Full)) {
      state.push('满溢');
    }
    node.icontitle = state.join(',');

    if (defaultType) {
      node.level = this.level(data, defaultType);
    }
    node.extendable = false;
    node.parentId = data.DivisionId;

    if (statistic) {
      if (statistic.TodayEventNumbers) {
        let alarms = [];
        for (let i = 0; i < statistic.TodayEventNumbers.length; i++) {
          const item = statistic.TodayEventNumbers[i];
          switch (item.EventType) {
            case EventType.IllegalDrop:
            case EventType.MixedInto:
              if (item.DayNumber > 0) {
                alarms.push(
                  `${Language.EventType(item.EventType)}:${item.DayNumber}`
                );
              }
              break;
            default:
              break;
          }
        }
        if (alarms.length > 0) {
          let btn_alarm = new MapControlTreeNodeButton(
            data,
            MapControlButtonType.alarm
          );
          btn_alarm.icon = 'howell-icon-alarm3';
          btn_alarm.title = alarms.join(',');
          node.buttons.push(btn_alarm);
        }
      }
    }

    let info = new MapControlTreeNodeButton(data, MapControlButtonType.info);
    info.icon = 'mdi mdi-file-document-box';
    info.title = '详情';
    info.class = 'hover';
    node.buttons.push(info);

    return node;
  }

  private level(data: Division | GarbageStation, defaultType: DivisionType) {
    if (defaultType === DivisionType.City) {
      return this.levelByCity(data);
    } else {
      return this.levelByCounty(data);
    }
  }

  private levelByCity(data: Division | GarbageStation) {
    if (data instanceof Division) {
      switch (data.DivisionType) {
        case DivisionType.County:
          return 0;
        case DivisionType.Committees:
          return 1;
        default:
          return -1;
      }
    } else if (data instanceof GarbageStation) {
      return 2;
    }
    return -1;
  }
  private levelByCounty(data: Division | GarbageStation) {
    if (data instanceof Division) {
      switch (data.DivisionType) {
        case DivisionType.Committees:
          return 0;
        default:
          return -1;
      }
    } else if (data instanceof GarbageStation) {
      return 1;
    }
    return -1;
  }
}
