import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { IIdNameModel } from 'src/app/network/model/model.interface';
import { ICommonTree } from '../common-tree/common-tree.model';

/**
 *  显示树的选中节点信息
 */
@Component({
  selector: 'common-label-select',
  templateUrl: './common-label-select.component.html',
  styleUrls: ['./common-label-select.component.less'],
})
export class CommonLabelSelecComponent
  implements OnInit, AfterViewInit, AfterContentInit, OnDestroy
{
  @Input()
  showDropDown = false;
  @Output()
  showDropDownChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  selectedNodes: IIdNameModel[] = [];

  @Input()
  autoclose = false;

  @Input()
  single = false;

  @Input()
  showCloseIcon = true;
  @Input()
  height = 'auto';

  @Output() toggleDropDown = new EventEmitter<boolean>();
  @Output() removeDropItem = new EventEmitter();

  @ContentChild('tree') tree?: ICommonTree;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  handle: any;

  subscription!: Subscription;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.subscription = fromEvent(this.document.body, 'click').subscribe(() => {
      if (this.autoclose) {
        this.showDropDown = false;
        this.showDropDownChange.emit(this.showDropDown);
      }
    });
  }
  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleHandler(e: Event) {
    e.stopPropagation();
    this.showDropDown = !this.showDropDown;
    this.showDropDownChange.emit(this.showDropDown);
    this.toggleDropDown.emit(this.showDropDown);
  }
  removeNode(e: Event, node: IIdNameModel) {
    e.stopPropagation();

    this.tree?.toggleNodes([node.Id]);

    this.removeDropItem.emit(node);
  }
  closeDropDown() {
    this.showDropDown = false;
    this.showDropDownChange.emit(this.showDropDown);
  }
}
