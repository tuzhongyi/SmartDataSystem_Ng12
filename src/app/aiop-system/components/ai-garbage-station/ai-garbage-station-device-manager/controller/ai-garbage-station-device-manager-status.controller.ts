import { EventEmitter, Injectable } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { IdNameModel } from 'src/app/network/model/model.interface';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import {
  AIGarbageStationDeviceStatusType,
  AiGarbageStationDeviceStatusFilterModel,
} from '../../ai-garbage-station-device-status-filter/ai-garbage-station-device-status-filter.model';

@Injectable()
export class AIGarbageStationDeviceManagerStatusController {
  select = new EventEmitter<AiGarbageStationDeviceStatusFilterModel>();
  show = false;
  value = new AiGarbageStationDeviceStatusFilterModel();

  selecteds: CommonFlatNode<IdNameModel>[] = [];

  onchange() {
    let items: CommonFlatNode<IdNameModel>[] = [];
    if (this.value.device != undefined) {
      let node = new CommonFlatNode();
      node.Id = AIGarbageStationDeviceStatusType.division;
      node.Name = `智能设备:${Language.OnlineStatus(this.value.device)}`;
      items.push(node);
    }
    if (this.value.analysis != undefined) {
      let node = new CommonFlatNode();
      node.Id = AIGarbageStationDeviceStatusType.analysis;
      node.Name = `分析服务:${Language.OnlineStatus(this.value.analysis)}`;
      items.push(node);
    }
    if (this.value.gcha != undefined) {
      let node = new CommonFlatNode();
      node.Id = AIGarbageStationDeviceStatusType.gcha;
      node.Name = `GCHA:${Language.OnlineStatus(this.value.gcha)}`;
      items.push(node);
    }
    this.selecteds = items;
    this.select.emit(this.value);
  }
}
