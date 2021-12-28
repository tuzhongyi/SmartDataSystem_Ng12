import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from './select-control.model';

@Component({
  selector: 'app-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.less'],
})
export class SelectControlComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.selected = this.data[0];
    }
    window.addEventListener('click', () => {
      this.opened = false;
    });
  }

  @Input()
  data?: SelectItem[];

  @Output()
  selectedEvent: EventEmitter<SelectItem> = new EventEmitter();

  selected: SelectItem = new SelectItem();

  opened = false;

  toggle(event: Event) {
    this.opened = !this.opened;
    event.stopPropagation();
  }
  select(event: Event, item: SelectItem) {
    if (this.selected === item) return;
    this.selected = item;
    this.opened = false;
    this.selectedEvent.emit(item);
  }
}
