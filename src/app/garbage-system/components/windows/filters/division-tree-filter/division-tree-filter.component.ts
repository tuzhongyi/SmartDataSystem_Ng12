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
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { wait } from 'src/app/common/tools/tool';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { DistrictTreeEnum } from 'src/app/enum/district-tree.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';

@Component({
  selector: 'howell-division-tree-filter',
  templateUrl: './division-tree-filter.component.html',
  styleUrls: ['./division-tree-filter.component.less'],
})
export class DivisionTreeFilterComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input()
  type: DivisionType = DivisionType.City;

  resourceType = UserResourceType.County;

  @Output()
  select: EventEmitter<Division> = new EventEmitter();

  @Input()
  division?: Division;

  @ViewChild('selected')
  input?: ElementRef<HTMLLabelElement>;

  @Input()
  align: HorizontalAlign = HorizontalAlign.right;

  treeServiceModel = DistrictTreeEnum.Division;
  treeSelectModel = SelectStrategy.Single;

  // current?: FlatTreeNode;
  current?: CommonFlatNode<Division | GarbageStation>;

  expand = false;

  style = {
    top: '0',
  };

  HorizontalAlign = HorizontalAlign;

  constructor(private store: GlobalStorageService) {
    this.type = store.defaultDivisionType;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.division && this.division) {
      this.current = new CommonFlatNode();
      // this.division.Id, this.division.Name, 3
      this.current.Id = this.division.Id;
      this.current.Name = this.division.Name;
      this.current.Level = 3;
      this.current.RawData = this.division;
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
    window.addEventListener('click', () => {
      this.expand = false;
    });
  }

  ngOnInit(): void {}

  // selectTreeNode(nodes: FlatTreeNode[]) {
  //   for (let i = 0; i < nodes.length; i++) {
  //     const node = nodes[i];
  //     this.current = node;
  //     this.select.emit(node.rawData);
  //   }
  // }

  selectTreeNode(nodes: CommonFlatNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      this.current = node;
      if (node.RawData instanceof Division)
        this.select.emit(node.RawData as Division);
    }
  }

  onclick(event: Event) {
    this.expand = !this.expand;
    event.cancelBubble = true;
  }
}
