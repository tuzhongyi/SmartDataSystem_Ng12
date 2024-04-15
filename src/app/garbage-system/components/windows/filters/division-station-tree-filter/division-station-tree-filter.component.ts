import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ClassConstructor } from 'class-transformer';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { wait } from 'src/app/common/tools/tool';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { DistrictTreeEnum } from 'src/app/enum/district-tree.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { DivisionStationTreeFilterBusiness } from './division-station-tree-filter.business';

@Component({
  selector: 'howell-division-station-tree-filter',
  templateUrl: './division-station-tree-filter.component.html',
  styleUrls: ['./division-station-tree-filter.component.less'],
  providers: [DivisionStationTreeFilterBusiness],
})
export class DivisionStationTreeFilterComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input()
  type: DivisionType;

  @Output()
  select: EventEmitter<GarbageStation> = new EventEmitter();

  @Input()
  stationId?: string;

  @ViewChild('selected')
  input?: ElementRef<HTMLLabelElement>;

  @Input()
  align: HorizontalAlign = HorizontalAlign.right;

  filterTypes: ClassConstructor<any>[] = [GarbageStation];

  treeServiceModel = DistrictTreeEnum.Station;
  treeSelectModel = SelectStrategy.Single;

  current?: DivisionTreeSource[];
  currentTitle: string[] = [];

  closetreehandle: any;

  tree = {
    depth: 2,
    expand: false,
  };

  style = {
    top: '0',
  };
  HorizontalAlign = HorizontalAlign;
  constructor(
    private store: GlobalStorageService,
    private business: DivisionStationTreeFilterBusiness,
    private _divisionRequest: DivisionRequestService
  ) {
    this.type = store.divisionType;

    if (this.type === DivisionType.City) {
      this.tree.depth = 3;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('click', this.closetreehandle);
  }

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

    this.closetreehandle = this.ontreeclick.bind(this);
    window.addEventListener('click', this.closetreehandle);
  }

  ngOnInit(): void {
    this.business.load(this.type, this.stationId).then((datas) => {
      this.current = datas;
      this.currentTitle = this.getLocalTitle(this.current);
      let station = datas.find((x) => x instanceof GarbageStation);
      if (station) {
        this.stationId = station.Id;
        this.select.emit(station as GarbageStation);
      }
    });
  }

  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    if (nodes.length > 0) {
      let station = nodes[0].RawData;
      if (station instanceof GarbageStation) {
        this.select.emit(station);

        this.business.load(this.type, station.Id).then((datas) => {
          this.current = datas;
          this.currentTitle = this.getLocalTitle(this.current);
        });
      }
    }
  }

  ontreeclick() {
    this.tree.expand = false;
  }

  onclick(event: Event) {
    this.tree.expand = !this.tree.expand;
    event.cancelBubble = true;
  }

  getLocalTitle(nodes: DivisionTreeSource[]) {
    return nodes.map((x) => {
      return x.Name;
    });
  }

  async getRemoteTitle(id?: string) {
    if (id) {
      let division = await this._getDivision(id);
      if (division.DivisionType == DivisionType.City) return;
      this.currentTitle.unshift(division.Name);
      await this.getRemoteTitle(division.ParentId);
    }
  }

  private async _getDivision(id: string) {
    return await this._divisionRequest.get(id);
  }
}
