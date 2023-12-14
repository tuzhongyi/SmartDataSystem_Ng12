import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ILevelListNode } from './level-list-panel.model';
@Component({
  selector: 'level-list-panel',
  templateUrl: './level-list-panel.component.html',
  styleUrls: ['./level-list-panel.component.less'],
})
export class LevelListPanelComponent implements OnInit, OnDestroy {
  @Input()
  cannull: boolean = true;
  @Input() nulllanguage = '请选择';
  @Input()
  nodes: ILevelListNode[] = [];
  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();

  @Input()
  public set selected(v: ILevelListNode | undefined) {
    this._selected = v;
    this.selectedChange.emit(v);
  }
  private _selected?: ILevelListNode;
  public get selected(): ILevelListNode | undefined {
    return this._selected;
  }

  @Output()
  selectedChange: EventEmitter<ILevelListNode | undefined> = new EventEmitter();

  constructor() {}

  handle: any;

  ngOnDestroy(): void {
    if (this.handle) {
      window.removeEventListener('click', this.handle);
    }
  }
  ngOnInit(): void {
    this.handle = this.onclose.bind(this);
    window.addEventListener('click', this.handle);
  }

  onclose() {
    this.opened = false;
    this.openedChange.emit(this.opened);
  }

  onclick(e: Event) {
    this.opened = !this.opened;
    this.openedChange.emit(this.opened);
    e.stopImmediatePropagation();
  }

  onselect(e: Event, node: ILevelListNode) {
    this.selected = node;
    e.stopImmediatePropagation();
  }

  onclear(e: Event) {
    this.selected = undefined;
    this.onclose();
    e.stopImmediatePropagation();
  }
}
