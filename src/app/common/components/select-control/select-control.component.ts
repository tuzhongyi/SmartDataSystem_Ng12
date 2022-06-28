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
  @Input()
  cannull: boolean = false;
  @Input()
  cansearch = false;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && changes.load.firstChange) {
      if (this.load) {
        this.load.subscribe((x) => {
          if (x) {
            this.onselect(x);
          }
        });
      }
    }
  }

  ngOnInit(): void {
    window.addEventListener('click', () => {
      this.opened = false;
    });
    if (this.data && this.data.length > 0 && !this.load) {
      this.onselect(this.data[0]);
    }
  }

  selected?: SelectItem;

  opened = false;

  toggle(event: Event) {
    this.opened = !this.opened;
    event.stopPropagation();
  }
  onselect(item: SelectItem, event?: Event) {
    if (this.selected === item) return;
    this.selected = item;
    this.opened = false;
    this.select.emit(item);
    if (this.standby) {
      this.data = this.standby;
      this.standby = undefined;
    }
  }

  clear(event: Event) {
    this.selected = undefined;
    event.cancelBubble = true;
    this.opened = false;
    this.select.emit(undefined);
  }
  standby?: SelectItem[];
  search(text: string) {
    if (this.standby) {
      this.data = this.standby;
      this.standby = undefined;
    }
    if (text) {
      if (this.data) {
        this.standby = this.data;
        this.data = this.data.filter((x) => {
          return x.language.indexOf(text) >= 0;
        });
      }
    }
  }
  onsearching(event: Event) {
    event.cancelBubble = true;
  }
}
