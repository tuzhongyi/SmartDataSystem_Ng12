import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  template: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export abstract class AbstractSelectComponent<T> implements OnInit {
  @Input()
  selected?: T;
  @Output()
  selectedChange: EventEmitter<T> = new EventEmitter();

  constructor() {}
  ngOnInit(): void {
    this.init();
    this.languages = this.language(this.models);
  }

  models: T[] = [];
  languages: string[] = [];

  abstract init(): void;
  abstract language(models: T[]): string[];

  onchange() {
    this.selectedChange.emit(this.selected);
  }
}
