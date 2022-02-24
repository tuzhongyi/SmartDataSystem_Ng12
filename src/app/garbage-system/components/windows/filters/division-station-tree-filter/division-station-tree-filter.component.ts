import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { wait } from 'src/app/common/tools/tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { SelectEnum } from 'src/app/enum/select.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';

@Component({
  selector: 'howell-division-station-tree-filter',
  templateUrl: './division-station-tree-filter.component.html',
  styleUrls: ['./division-station-tree-filter.component.less'],
})
export class DivisionStationTreeFilterComponent
  implements OnInit, AfterViewInit
{
  @Input()
  type: DivisionType;

  @Output()
  select: EventEmitter<string> = new EventEmitter();

  @Input()
  station?: GarbageStation;

  @ViewChild('selected')
  input?: ElementRef<HTMLLabelElement>;

  treeServiceProvider = TreeServiceEnum.Station;
  treeSelectModel = SelectEnum.Single;

  current?: FlatTreeNode;

  style = {
    top: '0',
  };

  constructor(private store: StoreService) {
    this.type = store.divisionType;
  }
  ngAfterViewInit(): void {
    if (this.input) {
      wait(
        () => {
          return !!this.input && this.input.nativeElement.offsetHeight > 0;
        },
        () => {
          this.style.top = this.input!.nativeElement.offsetHeight + 'px';
        }
      );
    }
  }

  ngOnInit(): void {}

  selectTree(nodes: FlatTreeNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      this.current = node;
      this.select.emit(node.id);
    }
  }
}
