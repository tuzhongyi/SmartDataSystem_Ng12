import { Injectable } from '@angular/core';
import { isEmpty } from 'src/app/common/tools/tool';
import { CommonTreeConverter } from 'src/app/converter/common-tree.converter';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { TreeSourceType } from './ai-garbage-station-region-tree.model';

@Injectable()
export class AIGarbageStationRegionTreeConverter extends CommonTreeConverter {
  Convert(source: TreeSourceType, ...res: any[]): CommonNestNode {
    if (source instanceof AIGarbageRegion) {
      return this._fromRegion(source);
    } else if (source instanceof Division) {
      return this._fromDivision(source);
    } else if (source instanceof AIGarbageDevice) {
      return this._fromDevice(source);
    }
    throw new Error('Method not implemented.');
  }

  private _fromDivision(item: Division): CommonNestNode<Division> {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = true;
    node.ParentId = item.ParentId;
    node.ChildrenLoaded = true;
    node.ParentNode = undefined;
    node.IconClass = 'howell-icon-earth';
    node.RawData = item;
    node.hideArrow = true;

    return node;
  }

  private _fromRegion(item: AIGarbageRegion): CommonNestNode<AIGarbageRegion> {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name ?? '';
    node.HasChildren = false;
    node.ParentId = item.DivisionId!;
    node.ChildrenLoaded = true;
    node.ParentNode = undefined;
    node.IconClass = 'howell-icon-map5';
    node.RawData = item;
    node.hideArrow = true;
    return node;
  }

  private _fromDevice(item: AIGarbageDevice): CommonNestNode<AIGarbageDevice> {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name ?? '';
    node.HasChildren = false;
    node.ParentId = item.RegionId!;
    node.ChildrenLoaded = true;
    node.ParentNode = undefined;
    node.IconClass = 'howell-icon-device';
    node.RawData = item;
    node.hideArrow = false;
    if (
      item.Status &&
      item.Status.GCHAStatus &&
      isEmpty(item.Status.GCHAStatus)
    ) {
      if (item.Status.GCHAStatus.OnlineState == OnlineStatus.Online) {
        node.ButtonIconClasses = ['howell-icon-signal'];
      } else {
        node.ButtonIconClasses = ['howell-icon-signal'];
      }
    }
    return node;
  }
}
