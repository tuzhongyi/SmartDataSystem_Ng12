import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'toast-window',
  templateUrl: './toast-window.component.html',
  styleUrls: ['./toast-window.component.less'],
})
export class ToastWindowComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.closeEvent.emit(false);
  }
}
