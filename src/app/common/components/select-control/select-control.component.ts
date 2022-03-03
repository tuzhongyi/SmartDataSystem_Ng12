import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
  load?: EventEmitter<any>;

  @Output()
  select: EventEmitter<SelectItem> = new EventEmitter();
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && changes.load.firstChange) {
      if (this.load) {
        this.load.subscribe((x) => {
          if (x) {
            this.selected = x;
          } else if (this.data && this.data.length > 0) {
            this.selected = this.data[0];
          } else {
          }
        });
      }
    }
    if (changes.data) {
      if (
        !changes.data.previousValue ||
        changes.data.previousValue.length === 0
      ) {
        if (this.data && this.data.length > 0) {
          this.selected = this.data[0];
        }
      }
    }
  }

  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      if (!this.selected) {
        this.selected = this.data[0];
        this.select.emit(this.selected);
      }
    }

    window.addEventListener('click', () => {
      this.opened = false;
    });
  }

  selected?: SelectItem;

  opened = false;

  toggle(event: Event) {
    this.opened = !this.opened;
    event.stopPropagation();
  }
  onselect(event: Event, item: SelectItem) {
    if (this.selected === item) return;
    this.selected = item;
    this.opened = false;
    this.select.emit(item);
  }
}
