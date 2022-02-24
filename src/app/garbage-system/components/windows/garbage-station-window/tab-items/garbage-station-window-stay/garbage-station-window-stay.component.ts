import { Component, OnInit } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { SelectEnum } from 'src/app/enum/select.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';

@Component({
  selector: 'howell-garbage-station-window-stay',
  templateUrl: './garbage-station-window-stay.component.html',
  styleUrls: ['./garbage-station-window-stay.component.less'],
})
export class GarbageStationWindowStayComponent implements OnInit {
  date: Date = new Date();

  unit: TimeUnit = TimeUnit.Hour;

  treeServiceProvider = TreeServiceEnum.Station;
  treeSelectModel = SelectEnum.Single;
  divisionType = DivisionType.County;

  constructor() {}

  ngOnInit(): void {}

  changeDate(date: Date) {
    this.date = date;
  }
}
