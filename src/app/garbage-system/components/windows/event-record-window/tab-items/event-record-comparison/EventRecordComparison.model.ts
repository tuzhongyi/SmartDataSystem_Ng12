import { EventEmitter } from '@angular/core';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { GarbageFullEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { IllegalDropEventRecord } from 'src/app/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { MixedIntoEventRecord } from 'src/app/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { IIdNameModel } from 'src/app/network/model/model.interface';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';

export interface EventRecordComparisonOptions {
  divisionType: DivisionType;
  eventType: EventType;
  ids: string[];
  unit: TimeUnit;
  date: Date;
}

export type EventRecordType =
  | IllegalDropEventRecord
  | MixedIntoEventRecord
  | GarbageFullEventRecord;

export type NumberStatisticV2 =
  | GarbageStationNumberStatisticV2
  | DivisionNumberStatisticV2;

export class DivisionSelection {
  show = false;
  selecteds: CommonFlatNode<DivisionTreeSource>[] = [];
  select: EventEmitter<DivisionTreeSource[]> = new EventEmitter();
  depth: number = 0;
  type: DivisionType = DivisionType.County;
  trigger: EventEmitter<string[]> = new EventEmitter();

  private _selectedIds?: string[] = undefined;
  public get selectedIds(): string[] {
    if (!this._selectedIds) {
      this._selectedIds = this.selecteds.map((x) => x.Id);
    }
    return this._selectedIds;
  }

  onselect(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.selecteds = nodes;
    this._selectedIds = undefined;
    this.select.emit(this.selecteds.map((x) => x.RawData));
  }
  onremove(node: IIdNameModel) {
    let index = this.selecteds.findIndex((x) => x.Id === node.Id);
    if (index >= 0) {
      this.selecteds.splice(index, 1);
      this._selectedIds = undefined;
    }
    this.trigger.emit([node.Id]);
  }
}
