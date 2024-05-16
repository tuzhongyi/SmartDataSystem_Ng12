import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'map-control-button',
  templateUrl: './map-control-button.component.html',
  styleUrls: ['./map-control-button.component.less'],
})
export class MapControlButtonComponent implements OnInit {
  @Input() selectable = true;
  @Input() selected = false;

  @Input() style: any;

  @Output() selectedChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  registfilter() {}

  onclick() {
    if (this.selectable) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
    }
  }
}
