import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'hw-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
})
export class SwitchComponent implements OnInit {
  @Output() onChanged: EventEmitter<boolean> = new EventEmitter();

  @Input() on: boolean = false;
  constructor() {}

  ngOnInit() {}

  btnClick() {
    this.on = !this.on;
    this.onChanged.emit(this.on);
  }
}
