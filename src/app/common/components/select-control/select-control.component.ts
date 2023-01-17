import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SelectItem } from './select-control.model';

@Component({
  selector: 'app-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.less'],
})
export class SelectControlComponent implements OnInit, OnChanges {
  @Input()
  data?: SelectItem[];
  @Input()
  cannull: boolean = false;
  @Input()
  default: boolean = true;

  private _selected?: SelectItem;
  public get selected(): SelectItem | undefined {
    return this._selected;
  }
  @Input()
  public set selected(v: SelectItem | undefined) {
    this._selected = v;
    this.selectedChange.emit(v);
  }
  @Output()
  selectedChange: EventEmitter<SelectItem> = new EventEmitter();

  constructor() {}
  @ViewChild('element')
  element?: ElementRef;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      if (this.default) {
        if (this.data && this.data.length > 0) {
          if (!this.selected) {
            this.selected = this.data[0];
          }
        } else {
          this.selected = undefined;
        }
      }
    }
  }

  ngOnInit(): void {}

  onclear(e: Event) {
    if (this.element) {
      let control = this.element.nativeElement as HTMLSelectElement;
      this.selected = undefined;
      control.value = '请选择';
    }
    e.stopImmediatePropagation();
  }
}
