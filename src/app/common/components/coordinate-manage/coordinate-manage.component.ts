import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'coordinate-manage',
  templateUrl: './coordinate-manage.component.html',
  styleUrls: ['./coordinate-manage.component.less']
})
export class CoordinateManageComponent implements OnInit {

  myForm = new FormGroup({
    lon: new FormControl(''),
    lat: new FormControl('')
  })

  @Input() title = "";

  @Output() closeEvent = new EventEmitter<Coordinate | null>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.closeEvent.emit({
      lon: 121.481032,
      lat: 31.277591
    });
  }
  onReset() {
    this.closeEvent.emit(null);
  }
}

export interface Coordinate {
  lon: number;
  lat: number;
}