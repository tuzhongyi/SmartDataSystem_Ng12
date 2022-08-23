import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { wait } from 'src/app/common/tools/tool';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { DistrictTreeEnum } from 'src/app/enum/district-tree.enum';

import { EnumHelper } from 'src/app/enum/enum-helper';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TreeBusinessEnum } from 'src/app/enum/tree-business.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { GlobalStoreService } from 'src/app/common/service/global-store.service';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { Division } from 'src/app/network/model/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DivisionType } from 'src/app/enum/division-type.enum';

@Component({
  selector: 'howell-division-station-tree-filter',
  templateUrl: './division-station-tree-filter.component.html',
  styleUrls: ['./division-station-tree-filter.component.less'],
})
export class DivisionStationTreeFilterComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input()
  type: UserResourceType;

  @Output()
  select: EventEmitter<GarbageStation> = new EventEmitter();

  @Input()
  station?: GarbageStation;

  @ViewChild('selected')
  input?: ElementRef<HTMLLabelElement>;

  @Input()
  align: HorizontalAlign = HorizontalAlign.right;

  filterTypes: UserResourceType[] = [UserResourceType.Station]

  treeServiceModel = DistrictTreeEnum.Station;
  treeSelectModel = SelectStrategy.Single;

  current?: FlatTreeNode;
  currentTitle: string[] = [];

  expand = false;

  style = {
    top: '0',
  };
  HorizontalAlign = HorizontalAlign;
  constructor(private store: GlobalStoreService, private _divisionRequest: DivisionRequestService) {
    this.type = EnumHelper.ConvertDivisionToUserResource(store.divisionType);
  }


  async ngOnChanges(changes: SimpleChanges) {
    if (changes.station && this.station) {
      this.current = new FlatTreeNode(this.station.Id, this.station.Name, 3);
      this.current.rawData = this.station;
      this.current.parentId = this.station.DivisionId ?? null;

      this.currentTitle = [this.current.name];

      await this.getRemoteTitle(this.current.parentId);
      // console.log(this.currentTitle)
    }
  }
  ngOnDestroy(): void { }

  ngAfterViewInit(): void {
    if (this.input) {
      wait(
        () => {
          return !!this.input && this.input.nativeElement.offsetHeight > 0;
        },
        () => {
          this.style.top = this.input!.nativeElement.offsetHeight + 5 + 'px';
        }
      );
    }
    // window.addEventListener('click', () => {
    //   this.expand = false;
    // });
  }

  ngOnInit(): void {
  }

  selectTreeNode(nodes: FlatTreeNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      this.current = node;
      this.select.emit(node.rawData);
    }
    this.expand = false;
    if (this.current) {
      this.currentTitle = this.getLocalTitle(this.current);
    }
  }

  onclick(event: Event) {
    this.expand = !this.expand;
    event.cancelBubble = true;
  }

  getLocalTitle(node: FlatTreeNode) {
    let title: string[] = [];
    if (node.type != this.type) {
      title.unshift(node.name)
      if (node.parentNode)
        title.unshift(...(this.getLocalTitle(node.parentNode)));
    }
    return title;
  }

  async getRemoteTitle(id: string | null) {
    if (id) {
      let division = await this._getDivision(id);
      if (division.DivisionType == DivisionType.City) return
      this.currentTitle.unshift(division.Name);
      await this.getRemoteTitle(division.ParentId ?? null)
    }
  }



  private async _getDivision(id: string) {
    return await this._divisionRequest.get(id);
  }


}
