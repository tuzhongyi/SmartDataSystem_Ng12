import { EventEmitter } from '@angular/core';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { DeviceSession } from 'src/app/network/model/html2tcp/device-session.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';

export class AIGarbageDeviceModel extends AIGarbageDevice {
  session?: DeviceSession;
  selected = false;
}

export class AIGarbageStationDeviceSessionListArgs {
  name?: string;
  regionId?: string;
  divisionId?: string;
}

export class AIGarbageDeviceTreeSelection {
  show = false;
  selecteds: CommonFlatNode<DivisionTreeSource>[] = [];
  select: EventEmitter<Division | AIGarbageRegion> = new EventEmitter();

  onselect(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.selecteds = nodes;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (
        node.RawData instanceof Division ||
        node.RawData instanceof AIGarbageRegion
      ) {
        this.select.emit(node.RawData);
        this.show = false;
        return;
      }
    }
    this.select.emit();
  }
}
