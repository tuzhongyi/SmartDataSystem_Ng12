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
  load?: EventEmitter<string>;
  @Output()
  select: EventEmitter<SelectItem> = new EventEmitter();
  @Input()
  cannull: boolean = false;
  @Input()
  cansearch = false;

  constructor() {}
  @ViewChild('element')
  element?: ElementRef;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && changes.load.firstChange) {
      if (this.load) {
        this.load.subscribe((key) => {
          if (key && this.data) {
            let index = this.data.findIndex((x) => x.key === key);
            if (index >= 0) {
              this.onselect(this.data[index]);
            }
          }
        });
      }
    }
    if (changes.data) {
      if (this.data && this.data.length > 0) {
        if (!this.selected) {
          this.selected = this.data[0];
        }
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

  @Input()
  selected?: SelectItem;

  opened = false;

  toggle(event: Event) {
    this.opened = !this.opened;
    event.stopPropagation();
  }
  onselect(item?: SelectItem, event?: Event) {
    // if (this.selected === item) return;
    // this.selected = item;
    // this.opened = false;
    // this.select.emit(item);
    // if (this.standby) {
    //   this.data = this.standby;
    //   this.standby = undefined;
    // }
    this.select.emit(this.selected);
  }

  onclear(e: Event) {
    if (this.element) {
      let control = this.element.nativeElement as HTMLSelectElement;
      this.selected = undefined;
      control.value = '请选择';
    }
    e.stopImmediatePropagation();
  }
}
