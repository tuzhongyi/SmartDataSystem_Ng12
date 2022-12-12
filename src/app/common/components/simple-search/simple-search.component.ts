import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'howell-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.less'],
})
export class SimpleSearchComponent implements OnInit {
  @Input() placeHolder = '';

  @Output() searchEvent = new EventEmitter<string>();

  @Input() value = '';

  constructor() {}

  ngOnInit(): void {}
  search() {
    this.searchEvent.emit(this.value);
  }
  getValue() {
    return this.value;
  }
}
