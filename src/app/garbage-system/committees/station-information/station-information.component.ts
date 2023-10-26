import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { Member } from 'src/app/network/model/garbage-station/member.model';

@Component({
  selector: 'app-station-information',
  templateUrl: './station-information.component.html',
  styleUrls: ['./station-information.component.css'],
})
export class DivisionInformationComponent implements OnInit, OnChanges {
  @Input()
  Division?: Division;

  @Input()
  Station?: GarbageStation;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Station) {
      this._DefaultMember = undefined;
    }
  }

  private _DefaultMember?: Member;
  get DefaultMember() {
    if (this.Station && this.Station.Members && this.Station.Members) {
      this._DefaultMember = this.Station.Members[0];
    }
    return this._DefaultMember;
  }

  get Members() {
    if (this.Station) {
      return this.Station.Members ? this.Station.Members : [];
    }
    return [];
  }

  ngOnInit() {}
}
