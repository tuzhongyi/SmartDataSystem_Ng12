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
import { ClassConstructor } from 'class-transformer';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { wait } from 'src/app/common/tools/tool';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { DistrictTreeEnum } from 'src/app/enum/district-tree.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
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
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
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

  expand = false;

  tree = {
    depth: 2,
    loaded: false,
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

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.stationId && this.stationId) {
      // console.log(this.station);
      // this.current = new FlatTreeNode(this.station.Id, this.station.Name, 3);
      // this.current.rawData = this.station;
      // this.current.parentId = this.station.DivisionId;
      // this.currentTitle = [this.current.name];
      // await this.getRemoteTitle(this.current.parentId);
      // console.log(this.currentTitle)
    }
  }
  ngOnDestroy(): void {}

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
    this.business.load(this.type, this.stationId).then((datas) => {
      this.current = datas;
      this.currentTitle = this.getLocalTitle(this.current);
      let station = datas.find((x) => x instanceof GarbageStation);
      this.select.emit(station as GarbageStation);
    });
  }

  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    if (nodes.length > 0) {
      let station = nodes[0].RawData as GarbageStation;
      this.select.emit(station);

      this.business.load(this.type, station.Id).then((datas) => {
        this.current = datas;
        this.currentTitle = this.getLocalTitle(this.current);
      });
    }

    if (this.tree.loaded) {
      this.expand = false;
      this.tree.loaded = false;
    } else {
      this.tree.loaded = true;
    }
  }

  onclick(event: Event) {
    this.expand = !this.expand;
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
