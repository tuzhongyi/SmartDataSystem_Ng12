import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'coordinate-manage',
  templateUrl: './coordinate-manage.component.html',
  styleUrls: ['./coordinate-manage.component.less']
})
export class CoordinateManageComponent implements OnInit {


  @Output()
  closeEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.closeEvent.emit(true);
  }
  onReset() {
    this.closeEvent.emit(false);
  }
}
